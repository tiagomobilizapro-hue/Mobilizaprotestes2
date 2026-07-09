// ============================================================
// MobilizaPro 1.19 - Anti-conflito multiusuário
// Objetivo: evitar que um navegador com cache antigo sobrescreva
// registros criados/alterados por outro usuário.
// Estratégia:
// 1) cada candidato ganha um client_uid estável;
// 2) em conflito 409, a tela puxa o estado atual do servidor;
// 3) o estado local é mesclado sobre o estado do servidor;
// 4) colisões de ID local são reenumeradas antes do reenvio.
// ============================================================
(function () {
  'use strict';

  var STATE_KEY = 'mobilizaprp-state-v3';
  var API = 'api/store.php';
  var native = {
    getItem: Storage.prototype.getItem,
    setItem: Storage.prototype.setItem
  };

  function parseJSON(value, fallback) {
    try { return JSON.parse(value || ''); } catch (e) { return fallback; }
  }

  function getLocalState() {
    return normalizeState(parseJSON(native.getItem.call(localStorage, STATE_KEY), {}));
  }

  function setLocalState(state) {
    try { native.setItem.call(localStorage, STATE_KEY, JSON.stringify(normalizeState(state))); } catch (e) {}
  }

  function normalizeState(state) {
    state = state && typeof state === 'object' ? state : {};
    return {
      trainingMatrix: Array.isArray(state.trainingMatrix) ? state.trainingMatrix : [],
      candidates: Array.isArray(state.candidates) ? state.candidates : [],
      solicitations: Array.isArray(state.solicitations) ? state.solicitations : []
    };
  }

  function onlyDigits(value) {
    return String(value == null ? '' : value).replace(/\D+/g, '');
  }

  function cleanText(value) {
    return String(value == null ? '' : value).trim();
  }

  function makeUid(prefix) {
    if (window.crypto && crypto.randomUUID) return prefix + '-' + crypto.randomUUID();
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }

  function candidateUid(candidate) {
    return cleanText(candidate.client_uid || candidate._mobi_uid || candidate.mobi_uid || candidate.uid);
  }

  function ensureCandidateUids(state) {
    state = normalizeState(state);
    state.candidates.forEach(function (candidate) {
      if (!candidate || typeof candidate !== 'object') return;
      var uid = candidateUid(candidate);
      if (!uid) {
        var cpf = onlyDigits(candidate.cpf).slice(0, 11);
        uid = cpf ? ('cpf-' + cpf) : makeUid('cand');
      }
      candidate.client_uid = uid;
      candidate._mobi_uid = uid;
    });
    return state;
  }

  function solicitationKey(item) {
    if (!item || typeof item !== 'object') return '';
    return [
      onlyDigits(item.rm).slice(0, 24),
      cleanText(item.digital_obra || item.digitalObra || item.obra_digital).toUpperCase(),
      cleanText(item.func).toUpperCase()
    ].join('|');
  }

  function candidateIdentity(candidate) {
    if (!candidate || typeof candidate !== 'object') return '';
    var uid = candidateUid(candidate);
    if (uid) return 'uid:' + uid;
    var cpf = onlyDigits(candidate.cpf).slice(0, 11);
    if (cpf) return 'cpf:' + cpf;
    var id = parseInt(candidate.id || candidate.legacy_id || 0, 10);
    if (id > 0) return 'legacy:' + id;
    return 'tmp:' + makeUid('candidate');
  }

  function hasValue(value) {
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  function mergeRecord(serverRecord, localRecord) {
    var result = Object.assign({}, serverRecord || {});
    Object.keys(localRecord || {}).forEach(function (key) {
      var localValue = localRecord[key];
      var serverValue = result[key];
      // Em conflito, não deixe valor vazio do navegador apagar valor já confirmado no MySQL.
      if (!hasValue(localValue) && hasValue(serverValue)) return;
      result[key] = localValue;
    });
    return result;
  }

  function maxLegacyId(candidates) {
    return (candidates || []).reduce(function (max, candidate) {
      var id = parseInt(candidate && (candidate.id || candidate.legacy_id) || 0, 10);
      return id > max ? id : max;
    }, 0);
  }

  function reassignCollidingLegacyIds(candidates) {
    var used = Object.create(null);
    var next = maxLegacyId(candidates) + 1;
    (candidates || []).forEach(function (candidate) {
      if (!candidate || typeof candidate !== 'object') return;
      var id = parseInt(candidate.id || candidate.legacy_id || 0, 10);
      if (id <= 0 || used[id]) {
        id = next++;
        candidate.id = id;
        candidate.legacy_id = id;
        candidate._mobi_reassigned_id = true;
      } else {
        used[id] = true;
        candidate.id = id;
      }
    });
  }

  function mergeStates(serverState, localState) {
    serverState = ensureCandidateUids(serverState);
    localState = ensureCandidateUids(localState);

    var merged = {
      trainingMatrix: serverState.trainingMatrix && serverState.trainingMatrix.length ? serverState.trainingMatrix.slice() : localState.trainingMatrix.slice(),
      candidates: [],
      solicitations: []
    };

    var solicByKey = Object.create(null);
    serverState.solicitations.forEach(function (item) {
      var key = solicitationKey(item);
      if (key) solicByKey[key] = Object.assign({}, item);
    });
    localState.solicitations.forEach(function (item) {
      var key = solicitationKey(item);
      if (!key) return;
      solicByKey[key] = mergeRecord(solicByKey[key] || {}, item);
    });
    merged.solicitations = Object.keys(solicByKey).map(function (key) { return solicByKey[key]; });

    var candByKey = Object.create(null);
    serverState.candidates.forEach(function (candidate) {
      var key = candidateIdentity(candidate);
      candByKey[key] = Object.assign({}, candidate);
    });
    localState.candidates.forEach(function (candidate) {
      var key = candidateIdentity(candidate);
      candByKey[key] = mergeRecord(candByKey[key] || {}, candidate);
    });
    merged.candidates = Object.keys(candByKey).map(function (key) { return candByKey[key]; });
    reassignCollidingLegacyIds(merged.candidates);

    return ensureCandidateUids(merged);
  }

  function token() {
    try {
      if (window.MobilizaProCloudStorage && typeof window.MobilizaProCloudStorage.getToken === 'function') {
        return window.MobilizaProCloudStorage.getToken() || '';
      }
    } catch (e) {}
    return '';
  }

  function csrf() {
    return window.MOBI_CSRF_TOKEN || '';
  }

  function readServerState() {
    return fetch(API + '?since=', {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      return response.json().catch(function () { return {}; });
    }).then(function (json) {
      var stateRaw = json && json.items ? json.items[STATE_KEY] : '';
      var state = normalizeState(parseJSON(stateRaw, {}));
      if (json && json.token && window.MobilizaProCloudStorage) {
        // O storage principal atualiza o token quando pull() é usado; aqui mantemos o estado local alinhado.
        try { window.MobilizaProCloudStorage.__lastServerToken119 = json.token; } catch (e) {}
      }
      return { json: json || {}, state: state, token: (json && json.token) || '' };
    });
  }

  function postState(state, baseToken) {
    state = ensureCandidateUids(state);
    return fetch(API + '?action=save_state', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Mobiliza-CSRF': csrf()
      },
      body: JSON.stringify({ state: state, base_token: baseToken || token(), merge_safe: true })
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (json) {
        return { status: response.status, json: json || {} };
      });
    });
  }

  function updateBadge(text, kind) {
    var badge = document.getElementById('mobi-save-status');
    if (!badge) return;
    badge.textContent = text;
    if (kind === 'warn') {
      badge.style.background = 'rgba(245,158,11,.24)';
      badge.style.borderColor = 'rgba(245,158,11,.55)';
    } else if (kind === 'ok') {
      badge.style.background = 'rgba(34,197,94,.20)';
      badge.style.borderColor = 'rgba(34,197,94,.55)';
    }
  }

  function saveWithMerge(state, callback) {
    var localState = ensureCandidateUids(state || getLocalState());
    setLocalState(localState);
    updateBadge('MySQL sincronizando...', 'warn');

    return postState(localState, token()).then(function (result) {
      if (result.json && result.json.ok) {
        updateBadge('MySQL confirmado ' + new Date().toLocaleTimeString('pt-BR'), 'ok');
        if (typeof callback === 'function') callback(result.json);
        return result.json;
      }

      if (result.status !== 409 && !(result.json && result.json.conflict)) {
        var msg = (result.json && result.json.message) || 'Não foi possível salvar no MySQL.';
        updateBadge('MySQL pendente - reenviar', 'warn');
        alert('MobilizaPro: ' + msg);
        if (typeof callback === 'function') callback(result.json || { ok: false });
        return result.json || { ok: false };
      }

      updateBadge('MySQL mesclando conflito...', 'warn');
      return readServerState().then(function (server) {
        var merged = mergeStates(server.state, localState);
        setLocalState(merged);
        return postState(merged, server.token || '').then(function (mergedResult) {
          if (mergedResult.json && mergedResult.json.ok) {
            updateBadge('MySQL confirmado com mesclagem ' + new Date().toLocaleTimeString('pt-BR'), 'ok');
            if (typeof callback === 'function') callback(Object.assign({}, mergedResult.json, { merged: true }));
            return Object.assign({}, mergedResult.json, { merged: true });
          }
          var mergedMsg = (mergedResult.json && mergedResult.json.message) || 'Conflito não resolvido automaticamente. Recarregue a tela.';
          updateBadge('MySQL conflito - revisar', 'warn');
          alert('MobilizaPro: ' + mergedMsg);
          if (typeof callback === 'function') callback(mergedResult.json || { ok: false });
          return mergedResult.json || { ok: false };
        });
      });
    }).catch(function (error) {
      updateBadge('MySQL pendente - reenviar', 'warn');
      var msg = error && error.message ? error.message : 'Falha de rede ao salvar.';
      alert('MobilizaPro: ' + msg);
      if (typeof callback === 'function') callback({ ok: false, message: msg });
      return { ok: false, message: msg };
    });
  }

  function install() {
    if (!window.MobilizaProCloudStorage || window.MobilizaProCloudStorage.__antiConflict119) return false;
    window.MobilizaProCloudStorage.saveStateDirect = saveWithMerge;
    window.MobilizaProCloudStorage.saveStateNow = function (callback) { return saveWithMerge(getLocalState(), callback); };
    window.MobilizaProCloudStorage.syncNow = function (callback) { return saveWithMerge(getLocalState(), callback); };
    window.MobilizaProCloudStorage.__antiConflict119 = true;
    var state = ensureCandidateUids(getLocalState());
    setLocalState(state);
    return true;
  }

  var timer = setInterval(function () {
    if (install()) clearInterval(timer);
  }, 100);
  setTimeout(function () { clearInterval(timer); install(); }, 5000);

  window.MobilizaProMultiusuario119 = {
    mergeStates: mergeStates,
    ensureCandidateUids: function () { var state = ensureCandidateUids(getLocalState()); setLocalState(state); return state; },
    saveNow: function () { return saveWithMerge(getLocalState()); }
  };
})();
