// ============================================================
// MobilizaPro 1.12 - Salvamento multiusuario garantido
// Mantem uma fila local persistente de lancamentos e reenvia ate
// receber confirmacao do MySQL. Evita falha silenciosa em conflito.
// ============================================================
(function () {
  'use strict';

  const OUTBOX_KEY = 'mobilizaprp-mysql-outbox-v2';
  const STATE_KEY = 'mobilizaprp-state-v3';
  const MAX_RETRIES = 10;
  const RETRY_BASE_MS = 1400;
  const native = {
    getItem: Storage.prototype.getItem,
    setItem: Storage.prototype.setItem,
    removeItem: Storage.prototype.removeItem
  };

  let outbox = [];
  let draining = false;
  let lastError = '';
  let lastConfirmedAt = null;
  let originalSaveStateDirect = null;

  function readOutbox() {
    try {
      const parsed = JSON.parse(native.getItem.call(localStorage, OUTBOX_KEY) || '[]');
      outbox = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      outbox = [];
    }
  }

  function writeOutbox() {
    try { native.setItem.call(localStorage, OUTBOX_KEY, JSON.stringify(outbox.slice(-20))); } catch (error) {}
  }

  function enqueue(state) {
    const snapshot = state || { trainingMatrix: [], candidates: [], solicitations: [] };
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      created_at: new Date().toISOString(),
      attempts: 0,
      state: snapshot
    };
    // Ultimo snapshot vence dentro do mesmo navegador: ele contem todos os lancamentos
    // que ainda nao foram confirmados e evita reenviar estados intermediarios antigos.
    outbox = [item];
    writeOutbox();
    updateGuaranteedBadge();
    return item;
  }

  function updateGuaranteedBadge() {
    const badge = document.getElementById('mobi-save-status');
    if (!badge) return;
    if (outbox.length) {
      badge.textContent = draining ? 'MySQL processando pendencia...' : 'MySQL pendente - reenviar';
      badge.title = lastError || 'Existe lancamento aguardando confirmacao do MySQL.';
      badge.style.background = 'rgba(245,158,11,.24)';
      badge.style.borderColor = 'rgba(245,158,11,.55)';
      badge.style.pointerEvents = 'auto';
      badge.style.cursor = 'pointer';
      badge.onclick = function () { drainOutbox(); };
      return;
    }
    if (lastConfirmedAt) {
      badge.textContent = 'MySQL confirmado ' + lastConfirmedAt.toLocaleTimeString('pt-BR');
      badge.title = 'Ultimo salvamento confirmado no servidor.';
    }
  }

  function getToken() {
    try {
      if (window.MobilizaProCloudStorage && typeof window.MobilizaProCloudStorage.getToken === 'function') {
        return window.MobilizaProCloudStorage.getToken() || '';
      }
    } catch (error) {}
    return '';
  }

  function pullServer() {
    return new Promise(resolve => {
      try {
        if (window.MobilizaProCloudStorage && typeof window.MobilizaProCloudStorage.pull === 'function') {
          window.MobilizaProCloudStorage.pull(json => resolve(json || {}));
          return;
        }
      } catch (error) {}
      resolve({});
    });
  }

  function postState(item) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'api/store.php?action=save_state', true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('X-Mobiliza-CSRF', window.MOBI_CSRF_TOKEN || '');
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        let json = {};
        try { json = JSON.parse(xhr.responseText || '{}'); } catch (error) {}
        resolve({ status: xhr.status, json });
      };
      xhr.onerror = function () {
        resolve({ status: 0, json: { ok: false, message: 'Falha de rede ao salvar.' } });
      };
      xhr.send(JSON.stringify({ state: item.state || {}, base_token: getToken() }));
    });
  }

  async function drainOutbox(callback) {
    if (draining) return { ok: false, pending: outbox.length };
    readOutbox();
    if (!outbox.length) {
      updateGuaranteedBadge();
      return { ok: true };
    }

    draining = true;
    updateGuaranteedBadge();

    while (outbox.length) {
      const item = outbox[0];
      item.attempts = (item.attempts || 0) + 1;
      item.last_attempt_at = new Date().toISOString();
      writeOutbox();

      const result = await postState(item);
      const json = result.json || {};

      if (json.ok) {
        outbox.shift();
        writeOutbox();
        lastError = '';
        lastConfirmedAt = new Date();
        try { native.setItem.call(localStorage, STATE_KEY, JSON.stringify(item.state || {})); } catch (error) {}
        if (typeof callback === 'function') callback(json);
        continue;
      }

      if (result.status === 409 || json.conflict) {
        await pullServer();
      }

      if (item.attempts < MAX_RETRIES) {
        lastError = json.message || 'Salvamento ainda nao confirmado. Nova tentativa automatica agendada.';
        writeOutbox();
        updateGuaranteedBadge();
        await new Promise(resolve => setTimeout(resolve, Math.min(RETRY_BASE_MS * item.attempts, 10000)));
        continue;
      }

      lastError = json.message || 'Nao foi possivel confirmar o lancamento no MySQL.';
      draining = false;
      updateGuaranteedBadge();
      alert('MobilizaPro: existe lancamento pendente sem confirmacao do MySQL.\n\nEle ficou guardado na fila local. Clique no indicador "MySQL pendente" ou salve novamente quando a conexao estiver normal.');
      if (typeof callback === 'function') callback({ ok: false, pending: true, message: lastError });
      return { ok: false, pending: true, message: lastError };
    }

    draining = false;
    updateGuaranteedBadge();
    return { ok: true };
  }

  function installWrapper() {
    if (!window.MobilizaProCloudStorage || window.MobilizaProCloudStorage.__guaranteedOutbox === true) return false;
    originalSaveStateDirect = window.MobilizaProCloudStorage.saveStateDirect;
    if (typeof originalSaveStateDirect !== 'function') return false;

    window.MobilizaProCloudStorage.saveStateDirect = function (state, callback) {
      enqueue(state || {});
      return drainOutbox(callback);
    };
    window.MobilizaProCloudStorage.retryPending = drainOutbox;
    window.MobilizaProCloudStorage.getPendingCount = function () {
      readOutbox();
      return outbox.length;
    };
    window.MobilizaProCloudStorage.__guaranteedOutbox = true;
    return true;
  }

  readOutbox();
  const installTimer = setInterval(function () {
    if (installWrapper()) {
      clearInterval(installTimer);
      if (outbox.length) setTimeout(drainOutbox, 800);
    }
  }, 100);
  setTimeout(function () { clearInterval(installTimer); installWrapper(); }, 5000);

  window.addEventListener('load', function () {
    updateGuaranteedBadge();
    if (outbox.length) setTimeout(drainOutbox, 1000);
  });

  window.addEventListener('online', function () {
    if (outbox.length) drainOutbox();
  });

  window.addEventListener('beforeunload', function (event) {
    readOutbox();
    if (!outbox.length && !draining) return;
    event.preventDefault();
    event.returnValue = 'Existe lancamento ainda nao confirmado no MySQL.';
    return event.returnValue;
  });
})();
