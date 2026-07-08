// ============================================================
// MOBILIZAPRO 1.10 - PERSISTÊNCIA DIRETA MYSQL MULTIUSUÁRIO
// MySQL é a fonte oficial dos dados operacionais.
// localStorage é usado somente como cache de leitura/preferências.
// Não intercepta localStorage, não faz auto-refresh, não salva em unload.
// ============================================================
(function () {
  'use strict';

  var API = 'api/store.php';
  var STATE_KEY = 'mobilizaprp-state-v3';
  var native = {
    getItem: Storage.prototype.getItem,
    setItem: Storage.prototype.setItem,
    removeItem: Storage.prototype.removeItem
  };

  var saving = false;
  var lastToken = '';
  var lastSaveAt = null;
  var lastError = '';
  var saveQueue = Promise.resolve();

  function csrf() {
    return window.MOBI_CSRF_TOKEN || (document.querySelector('meta[name="mobilizapro-csrf"]') || {}).content || '';
  }

  function updateBadge() {
    var badge = document.getElementById('mobi-save-status');
    if (!badge || !document.body) return;
    if (saving) {
      badge.textContent = 'Salvando no MySQL...';
      badge.style.background = 'rgba(245,158,11,.20)';
      badge.style.borderColor = 'rgba(245,158,11,.45)';
      return;
    }
    if (lastError) {
      badge.textContent = 'Falha ao salvar';
      badge.title = lastError;
      badge.style.background = 'rgba(239,68,68,.18)';
      badge.style.borderColor = 'rgba(239,68,68,.45)';
      return;
    }
    badge.textContent = lastSaveAt ? ('MySQL salvo ' + lastSaveAt.toLocaleTimeString('pt-BR')) : 'MySQL conectado';
    badge.style.background = 'rgba(34,197,94,.16)';
    badge.style.borderColor = 'rgba(34,197,94,.35)';
  }

  function ensureBadge() {
    if (document.getElementById('mobi-save-status') || !document.body) return;
    var badge = document.createElement('div');
    badge.id = 'mobi-save-status';
    badge.style.cssText = 'position:fixed;right:14px;bottom:12px;z-index:99999;padding:6px 10px;border-radius:999px;border:1px solid rgba(34,197,94,.35);background:rgba(34,197,94,.16);backdrop-filter:blur(8px);color:#fff;font:700 11px/1.2 system-ui,Segoe UI,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);opacity:.82;pointer-events:none;';
    badge.textContent = 'MySQL conectado';
    document.body.appendChild(badge);
  }

  function request(method, url, payload, async, callback) {
    var req = new XMLHttpRequest();
    try {
      req.open(method, url, async !== false);
      req.withCredentials = true;
      req.setRequestHeader('Accept', 'application/json');
      if (method !== 'GET') {
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('X-Mobiliza-CSRF', csrf());
      }
      if (async !== false && typeof callback === 'function') {
        req.onreadystatechange = function () {
          if (req.readyState !== 4) return;
          var json = null;
          try { json = JSON.parse(req.responseText || '{}'); } catch (e) {}
          callback(req.status, json || {}, req.responseText || '');
        };
      }
      req.send(payload ? JSON.stringify(payload) : null);
      if (async === false) {
        try { return { status: req.status, json: JSON.parse(req.responseText || '{}') }; }
        catch (e) { return { status: req.status, json: {} }; }
      }
    } catch (e) {
      if (typeof callback === 'function') callback(0, { ok:false, message:e.message }, '');
    }
    return null;
  }

  function mirrorStateToLocalStorage(state) {
    try {
      native.setItem.call(localStorage, STATE_KEY, JSON.stringify(state || { trainingMatrix: [], candidates: [], solicitations: [] }));
    } catch (e) {}
  }

  function loadFromServerSync() {
    var res = request('GET', API + '?t=' + Date.now(), null, false);
    if (!res || !res.json || !res.json.ok) return false;
    if (res.json.token) lastToken = String(res.json.token || '');
    var items = res.json.items || {};
    if (Object.prototype.hasOwnProperty.call(items, STATE_KEY)) {
      try { native.setItem.call(localStorage, STATE_KEY, String(items[STATE_KEY] || '')); } catch (e) {}
    }
    return true;
  }

  function loadFromServerAsync(callback) {
    request('GET', API + '?t=' + Date.now(), null, true, function (status, json) {
      if (json && json.ok) {
        if (json.token) lastToken = String(json.token || '');
        if (json.items && Object.prototype.hasOwnProperty.call(json.items, STATE_KEY)) {
          try { native.setItem.call(localStorage, STATE_KEY, String(json.items[STATE_KEY] || '')); } catch (e) {}
        }
        lastError = '';
      }
      if (typeof callback === 'function') callback(json || {});
    });
  }

  function saveStateDirect(state, callback) {
    // Enfileira salvamentos para evitar duas gravações simultâneas do mesmo navegador.
    saveQueue = saveQueue.then(function () {
      return new Promise(function (resolve) {
        saving = true;
        lastError = '';
        updateBadge();
        request('POST', API + '?action=save_state', { state: state || {}, base_token: lastToken }, true, function (status, json) {
          saving = false;
          if (json && json.ok) {
            lastToken = String(json.token || lastToken || '');
            lastSaveAt = new Date();
            lastError = '';
            mirrorStateToLocalStorage(state);
          } else if (status === 409 || (json && json.conflict)) {
            lastError = (json && json.message) || 'Este cadastro foi alterado por outro usuário. Recarregue antes de salvar.';
            alert(lastError);
          } else {
            lastError = (json && json.message) || 'Não foi possível salvar no MySQL.';
            alert('MobilizaPro: ' + lastError);
          }
          updateBadge();
          if (typeof callback === 'function') callback(json || { ok:false });
          resolve(json || { ok:false });
        });
      });
    }).catch(function (error) {
      lastError = error && error.message ? error.message : 'Falha inesperada ao salvar.';
      updateBadge();
    });
    return saveQueue;
  }

  window.MobilizaProCloudStorage = {
    pull: function (callback) { return loadFromServerAsync(callback); },
    pullSync: loadFromServerSync,
    syncNow: function (callback) {
      var raw = native.getItem.call(localStorage, STATE_KEY);
      var state = null;
      try { state = JSON.parse(raw || '{}'); } catch (e) { state = {}; }
      return saveStateDirect(state, callback);
    },
    saveStateDirect: saveStateDirect,
    saveStateNow: function (callback) { return this.syncNow(callback); },
    refreshScreen: function () { /* desativado para evitar tela piscando */ },
    getToken: function () { return lastToken; },
    getLastError: function () { return lastError; }
  };

  // Carrega a verdade do banco uma única vez antes da aplicação principal.
  loadFromServerSync();

  window.addEventListener('load', function () {
    ensureBadge();
    updateBadge();
  });
})();
