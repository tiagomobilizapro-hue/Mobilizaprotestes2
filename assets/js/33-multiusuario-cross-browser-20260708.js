// ============================================================
// MobilizaPro 1.20 - Cross-browser anti-conflito
// Objetivo: proteger salvamentos quando usuarios usam navegadores
// diferentes (Chrome, Edge, Firefox, mobile) com caches isolados.
// Estrategia:
// 1) sempre puxa o estado atual do MySQL antes de salvar;
// 2) mescla servidor + alteracoes locais usando uma base local;
// 3) preserva registros que existem no servidor mas nao no navegador;
// 4) usa fila persistente local para nao perder alteracao se cair rede;
// 5) em edicao simultanea do mesmo campo, preserva o local e marca alerta.
// ============================================================
(function () {
  'use strict';

  var STATE_KEY = 'mobilizaprp-state-v3';
  var BASE_KEY = 'mobilizaprp-state-v3-base-120';
  var OUTBOX_KEY = 'mobilizaprp-cross-browser-outbox-120';
  var API = 'api/store.php';
  var MAX_RETRIES = 8;
  var native = {
    getItem: Storage.prototype.getItem,
    setItem: Storage.prototype.setItem,
    removeItem: Storage.prototype.removeItem
  };
  var saving = false;
  var ownToken = '';
  var installed = false;

  function parseJSON(value, fallback) {
    try { return JSON.parse(value || ''); } catch (e) { return fallback; }
  }

  function stringify(value) {
    try { return JSON.stringify(value || {}); } catch (e) { return '{}'; }
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

  function clean(value) {
    return String(value == null ? '' : value).trim();
  }

  function makeUid(prefix) {
    if (window.crypto && crypto.randomUUID) return prefix + '-' + crypto.randomUUID();
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }

  function candidateUid(candidate) {
    if (!candidate || typeof candidate !== 'object') return '';
    return clean(candidate.client_uid || candidate._mobi_uid || candidate.mobi_uid || candidate.uid);
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

  function getLocalState() {
    return ensureCandidateUids(normalizeState(parseJSON(native.getItem.call(localStorage, STATE_KEY), {})));
  }

  function setLocalState(state) {
    try { native.setItem.call(localStorage, STATE_KEY, stringify(ensureCandidateUids(state))); } catch (e) {}
  }

  function getBaseState() {
    return ensureCandidateUids(normalizeState(parseJSON(native.getItem.call(localStorage, BASE_KEY), {})));
  }

  function setBaseState(state) {
    try { native.setItem.call(localStorage, BASE_KEY, stringify(ensureCandidateUids(state))); } catch (e) {}
  }

  function candidateKey(candidate) {
    if (!candidate || typeof candidate !== 'object') return '';
    var uid = candidateUid(candidate);
    if (uid) return 'uid:' + uid;
    var cpf = onlyDigits(candidate.cpf).slice(0, 11);
    if (cpf) return 'cpf:' + cpf;
    var id = parseInt(candidate.id || candidate.legacy_id || 0, 10);
    if (id > 0) return 'legacy:' + id;
    return '';
  }

  function solicitationKey(item) {
    if (!item || typeof item !== 'object') return '';
    return [
      onlyDigits(item.rm).slice(0, 24),
      clean(item.digital_obra || item.digitalObra || item.obra_digital).toUpperCase(),
      clean(item.func).toUpperCase()
    ].join('|');
  }

  function mapBy(list, keyFn) {
    var map = Object.create(null);
    (list || []).forEach(function (item) {
      var key = keyFn(item);
      if (!key) key = 'tmp:' + makeUid('row');
      map[key] = Object.assign({}, item || {});
    });
    return map;
  }

  function sameValue(a, b) {
    if (a === b) return true;
    var av = a == null ? '' : String(a);
    var bv = b == null ? '' : String(b);
    return av === bv;
  }

  function hasValue(value) {
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  function mergeRecordWithBase(serverRecord, localRecord, baseRecord, conflictLog, label) {
    var result = Object.assign({}, serverRecord || {});
    var keys = Object.create(null);
    Object.keys(serverRecord || {}).forEach(function (key) { keys[key] = true; });
    Object.keys(localRecord || {}).forEach(function (key) { keys[key] = true; });

    Object.keys(keys).forEach(function (key) {
      if (key === '_mobi_server_hash') return;
      var localValue = localRecord ? localRecord[key] : undefined;
      var serverValue = serverRecord ? serverRecord[key] : undefined;
      var baseValue = baseRecord ? baseRecord[key] : undefined;
      var localChanged = localRecord && !sameValue(localValue, baseValue);
      var serverChanged = serverRecord && baseRecord && !sameValue(serverValue, baseValue);

      // Valor vazio local nao apaga valor confirmado no MySQL, salvo se o usuario realmente alterou esse campo.
      if (!localChanged && hasValue(serverValue)) {
        result[key] = serverValue;
        return;
      }
      if (!hasValue(localValue) && hasValue(serverValue) && !localChanged) {
        result[key] = serverValue;
        return;
      }

      if (localChanged && serverChanged && !sameValue(localValue, serverValue)) {
        conflictLog.push({ record: label || '', field: key, local: localValue, server: serverValue });
        // Mantem a edicao local, mas registra conflito. Isso evita perder o que o usuario digitou.
        result[key] = localValue;
        return;
      }

      if (localChanged) {
        result[key] = localValue;
      } else if (serverRecord && Object.prototype.hasOwnProperty.call(serverRecord, key)) {
        result[key] = serverValue;
      } else if (localRecord && Object.prototype.hasOwnProperty.call(localRecord, key)) {
        result[key] = localValue;
      }
    });

    return result;
  }

  function maxLegacyId(candidates) {
    return (candidates || []).reduce(function (max, candidate) {
      var id = parseInt(candidate && (candidate.id || candidate.legacy_id) || 0, 10);
      return id > max ? id : max;
    }, 0);
  }

  function normalizeLegacyIds(candidates) {
    var used = Object.create(null);
    var next = maxLegacyId(candidates) + 1;
    (candidates || []).forEach(function (candidate) {
      if (!candidate || typeof candidate !== 'object') return;
      var id = parseInt(candidate.id || candidate.legacy_id || 0, 10);
      if (id <= 0 || used[id]) {
        id = next++;
        candidate._mobi_reassigned_id = true;
      }
      used[id] = true;
      candidate.id = id;
      candidate.legacy_id = id;
    });
  }

  function mergeStates(serverState, localState, baseState) {
    serverState = ensureCandidateUids(serverState);
    localState = ensureCandidateUids(localState);
    baseState = ensureCandidateUids(baseState);
    var conflicts = [];

    var serverCand = mapBy(serverState.candidates, candidateKey);
    var localCand = mapBy(localState.candidates, candidateKey);
    var baseCand = mapBy(baseState.candidates, candidateKey);
    var candKeys = Object.create(null);
    Object.keys(serverCand).forEach(function (key) { candKeys[key] = true; });
    Object.keys(localCand).forEach(function (key) { candKeys[key] = true; });

    var candidates = Object.keys(candKeys).map(function (key) {
      if (!localCand[key]) return serverCand[key];
      if (!serverCand[key]) return localCand[key];
      return mergeRecordWithBase(serverCand[key], localCand[key], baseCand[key] || {}, conflicts, key);
    });
    normalizeLegacyIds(candidates);

    var serverSol = mapBy(serverState.solicitations, solicitationKey);
    var localSol = mapBy(localState.solicitations, solicitationKey);
    var baseSol = mapBy(baseState.solicitations, solicitationKey);
    var solKeys = Object.create(null);
    Object.keys(serverSol).forEach(function (key) { solKeys[key] = true; });
    Object.keys(localSol).forEach(function (key) { solKeys[key] = true; });

    var solicitations = Object.keys(solKeys).map(function (key) {
      if (!localSol[key]) return serverSol[key];
      if (!serverSol[key]) return localSol[key];
      return mergeRecordWithBase(serverSol[key], localSol[key], baseSol[key] || {}, conflicts, 'sol:' + key);
    });

    var localMatrixChanged = stringify(localState.trainingMatrix) !== stringify(baseState.trainingMatrix);
    var serverMatrixChanged = stringify(serverState.trainingMatrix) !== stringify(baseState.trainingMatrix);
    var trainingMatrix = serverState.trainingMatrix && serverState.trainingMatrix.length ? serverState.trainingMatrix : localState.trainingMatrix;
    if (localMatrixChanged && !serverMatrixChanged) trainingMatrix = localState.trainingMatrix;
    if (localMatrixChanged && serverMatrixChanged && stringify(localState.trainingMatrix) !== stringify(serverState.trainingMatrix)) {
      conflicts.push({ record: 'trainingMatrix', field: 'payload', local: 'alterado neste navegador', server: 'alterado no servidor' });
      trainingMatrix = localState.trainingMatrix;
    }

    var merged = ensureCandidateUids({ trainingMatrix: trainingMatrix, candidates: candidates, solicitations: solicitations });
    merged._mobi_conflicts = conflicts;
    return merged;
  }

  function updateBadge(text, kind) {
    var badge = document.getElementById('mobi-save-status');
    if (!badge) return;
    badge.textContent = text;
    badge.title = text;
    badge.style.pointerEvents = 'auto';
    badge.style.cursor = 'pointer';
    badge.onclick = function () { drainOutbox(); };
    if (kind === 'error') {
      badge.style.background = 'rgba(239,68,68,.24)';
      badge.style.borderColor = 'rgba(239,68,68,.60)';
    } else if (kind === 'warn') {
      badge.style.background = 'rgba(245,158,11,.24)';
      badge.style.borderColor = 'rgba(245,158,11,.55)';
    } else {
      badge.style.background = 'rgba(34,197,94,.20)';
      badge.style.borderColor = 'rgba(34,197,94,.55)';
    }
  }

  function csrf() {
    return window.MOBI_CSRF_TOKEN || (document.querySelector('meta[name="mobilizapro-csrf"]') || {}).content || '';
  }

  function readServerState() {
    return fetch(API + '?t=' + Date.now(), {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      return response.json().catch(function () { return {}; });
    }).then(function (json) {
      var stateRaw = json && json.items ? json.items[STATE_KEY] : '';
      var state = ensureCandidateUids(normalizeState(parseJSON(stateRaw, {})));
      ownToken = String((json && json.token) || ownToken || '');
      return { json: json || {}, state: state, token: ownToken };
    });
  }

  function postMergedState(state, token) {
    state = ensureCandidateUids(state);
    return fetch(API + '?action=save_state', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Mobiliza-CSRF': csrf()
      },
      body: JSON.stringify({ state: state, base_token: token || ownToken || '', merge_safe: true })
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (json) {
        return { status: response.status, json: json || {} };
      });
    });
  }

  function readOutbox() {
    var list = parseJSON(native.getItem.call(localStorage, OUTBOX_KEY), []);
    return Array.isArray(list) ? list : [];
  }

  function writeOutbox(list) {
    try { native.setItem.call(localStorage, OUTBOX_KEY, stringify((list || []).slice(-10))); } catch (e) {}
  }

  function enqueue(state) {
    var list = readOutbox();
    var item = { id: makeUid('save'), created_at: new Date().toISOString(), attempts: 0, state: ensureCandidateUids(state || getLocalState()) };
    // Mantem somente o ultimo snapshot deste navegador. Antes de enviar, ele sera mesclado com o servidor.
    list = [item];
    writeOutbox(list);
    updateBadge('MySQL pendente - clique para reenviar', 'warn');
    return item;
  }

  function saveOne(item) {
    item = item || enqueue(getLocalState());
    item.attempts = (item.attempts || 0) + 1;
    var localState = ensureCandidateUids(item.state || getLocalState());
    var baseState = getBaseState();
    setLocalState(localState);
    updateBadge('MySQL validando outros navegadores...', 'warn');

    return readServerState().then(function (server) {
      var merged = mergeStates(server.state, localState, baseState);
      var conflictCount = Array.isArray(merged._mobi_conflicts) ? merged._mobi_conflicts.length : 0;
      delete merged._mobi_conflicts;
      setLocalState(merged);
      updateBadge(conflictCount ? 'MySQL mesclando com alerta...' : 'MySQL mesclando navegadores...', 'warn');
      return postMergedState(merged, server.token).then(function (result) {
        if (result.json && result.json.ok) {
          ownToken = String(result.json.token || ownToken || '');
          setLocalState(merged);
          setBaseState(merged);
          updateBadge(conflictCount ? ('MySQL confirmado com ' + conflictCount + ' alerta(s)') : ('MySQL confirmado ' + new Date().toLocaleTimeString('pt-BR')), conflictCount ? 'warn' : 'ok');
          if (conflictCount) {
            console.warn('MobilizaPro: conflitos mesclados entre navegadores.', merged);
          }
          return Object.assign({}, result.json, { ok: true, cross_browser_merge: true, conflict_count: conflictCount });
        }
        if (result.status === 409 || (result.json && result.json.conflict)) {
          // Se alguem salvou entre nosso pull e nosso post, deixa na fila para nova tentativa controlada.
          updateBadge('MySQL mudou durante o envio - reenviar', 'warn');
          return Object.assign({}, result.json || {}, { ok: false, retry: true });
        }
        updateBadge('MySQL pendente - reenviar', 'error');
        return result.json || { ok: false };
      });
    });
  }

  function drainOutbox(callback) {
    if (saving) return Promise.resolve({ ok: false, pending: true, message: 'Salvamento em andamento.' });
    var list = readOutbox();
    if (!list.length) {
      updateBadge('MySQL confirmado', 'ok');
      if (typeof callback === 'function') callback({ ok: true });
      return Promise.resolve({ ok: true });
    }

    saving = true;
    var item = list[0];
    return saveOne(item).then(function (result) {
      saving = false;
      if (result && result.ok) {
        writeOutbox([]);
        if (typeof callback === 'function') callback(result);
        return result;
      }
      item.attempts = (item.attempts || 0) + 1;
      if (item.attempts < MAX_RETRIES || (result && result.retry)) {
        writeOutbox([item]);
        setTimeout(function () { drainOutbox(); }, Math.min(1500 * item.attempts, 10000));
      } else {
        writeOutbox([item]);
        alert('MobilizaPro: existe alteração pendente neste navegador. O sistema preservou na fila local. Clique no indicador MySQL pendente para reenviar.');
      }
      if (typeof callback === 'function') callback(result || { ok: false });
      return result || { ok: false };
    }).catch(function (error) {
      saving = false;
      item.attempts = (item.attempts || 0) + 1;
      writeOutbox([item]);
      updateBadge('MySQL pendente - sem conexão', 'error');
      if (item.attempts < MAX_RETRIES) setTimeout(function () { drainOutbox(); }, Math.min(1500 * item.attempts, 10000));
      var result = { ok: false, pending: true, message: error && error.message ? error.message : 'Falha de rede.' };
      if (typeof callback === 'function') callback(result);
      return result;
    });
  }

  function saveNow(state, callback) {
    var item = enqueue(ensureCandidateUids(state || getLocalState()));
    return drainOutbox(callback);
  }

  function install() {
    if (installed || !window.MobilizaProCloudStorage) return false;
    installed = true;
    window.MobilizaProCloudStorage.saveStateDirect = saveNow;
    window.MobilizaProCloudStorage.saveStateNow = function (callback) { return saveNow(getLocalState(), callback); };
    window.MobilizaProCloudStorage.syncNow = function (callback) { return saveNow(getLocalState(), callback); };
    window.MobilizaProCloudStorage.retryPending = drainOutbox;
    window.MobilizaProCloudStorage.getPendingCount = function () { return readOutbox().length; };
    window.MobilizaProCloudStorage.__crossBrowser120 = true;

    var local = ensureCandidateUids(getLocalState());
    setLocalState(local);
    if (!native.getItem.call(localStorage, BASE_KEY)) setBaseState(local);

    // Atualiza base do navegador quando nao existe fila pendente.
    setTimeout(function () {
      if (readOutbox().length) return;
      readServerState().then(function (server) {
        if (server.state && (server.state.candidates.length || server.state.solicitations.length || server.state.trainingMatrix.length)) {
          setLocalState(server.state);
          setBaseState(server.state);
        }
      }).catch(function () {});
    }, 800);

    if (readOutbox().length) setTimeout(drainOutbox, 1000);
    updateBadge('MySQL multiusuário ativo', 'ok');
    return true;
  }

  var timer = setInterval(function () {
    if (install()) clearInterval(timer);
  }, 100);
  setTimeout(function () { clearInterval(timer); install(); }, 6000);

  window.addEventListener('online', function () { if (readOutbox().length) drainOutbox(); });
  window.addEventListener('beforeunload', function (event) {
    if (!readOutbox().length && !saving) return;
    event.preventDefault();
    event.returnValue = 'Existe alteração ainda não confirmada no MySQL.';
    return event.returnValue;
  });

  window.MobilizaProMultiusuario120 = {
    ensureCandidateUids: function () { var state = ensureCandidateUids(getLocalState()); setLocalState(state); return state; },
    mergeStates: mergeStates,
    drainOutbox: drainOutbox,
    saveNow: function () { return saveNow(getLocalState()); },
    resetBaseFromServer: function () {
      return readServerState().then(function (server) { setLocalState(server.state); setBaseState(server.state); return server.state; });
    },
    testPlan: [
      'Abrir Chrome e Edge com usuarios diferentes.',
      'Criar candidato A no Chrome e candidato B no Edge sem atualizar as telas.',
      'Salvar primeiro no Chrome e depois no Edge.',
      'Recarregar os dois navegadores e confirmar que A e B permanecem.',
      'Editar campos diferentes do mesmo candidato nos dois navegadores e salvar; campos devem ser mesclados.',
      'Editar o mesmo campo nos dois navegadores; o sistema preserva a ultima edicao local e registra alerta no console.'
    ]
  };
})();
