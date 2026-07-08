// ============================================================
// MobilizaPro 1.21 - Recrutador gravado no candidato
// Objetivo:
// - garantir que o usuario logado seja registrado como recrutador
//   quando um novo candidato e criado;
// - exibir o recrutador nos cards;
// - manter compatibilidade com salvamento multiusuario/cross-browser.
// ============================================================
(function () {
  'use strict';

  var installed = false;

  function esc(value) {
    if (typeof escapeHtml === 'function') return escapeHtml(value == null ? '' : value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }

  function clean(value, max) {
    value = String(value == null ? '' : value).trim();
    if (max && value.length > max) value = value.slice(0, max);
    return value;
  }

  function cpf(value) {
    return String(value == null ? '' : value).replace(/\D+/g, '').slice(0, 11);
  }

  function today() {
    if (typeof todayInputDate === 'function') return todayInputDate();
    return new Date().toISOString().slice(0, 10);
  }

  function currentRecruiter() {
    var user = null;
    try {
      if (typeof getCurrentAccessUser === 'function') user = getCurrentAccessUser();
    } catch (e) {}
    return {
      name: clean((user && (user.name || user.nome)) || '', 120).toUpperCase(),
      cpf: cpf(user && user.cpf)
    };
  }

  function candidateIdentity(candidate) {
    if (!candidate || typeof candidate !== 'object') return '';
    if (candidate.client_uid || candidate._mobi_uid) return 'uid:' + clean(candidate.client_uid || candidate._mobi_uid, 80);
    var doc = cpf(candidate.cpf);
    if (doc) return 'cpf:' + doc;
    if (candidate.id) return 'id:' + candidate.id;
    return [clean(candidate.name, 140).toUpperCase(), clean(candidate.rm, 30), clean(candidate.digital_obra || candidate.digitalObra, 40).toUpperCase(), clean(candidate.func, 120).toUpperCase()].join('|');
  }

  function hasRecruiter(candidate) {
    return !!clean(candidate && (candidate.recruiter_name || candidate.recruited_by_name || candidate.recrutador_nome), 120);
  }

  function stampRecruiter(candidate, force) {
    if (!candidate || typeof candidate !== 'object') return false;
    if (!force && hasRecruiter(candidate)) return false;
    var recruiter = currentRecruiter();
    if (!recruiter.name) return false;
    candidate.recruiter_name = recruiter.name;
    candidate.recruited_by_name = recruiter.name;
    candidate.recrutador_nome = recruiter.name;
    candidate.recruiter_cpf = recruiter.cpf;
    candidate.recruited_by_cpf = recruiter.cpf;
    candidate.recrutador_cpf = recruiter.cpf;
    if (!candidate.recruiter_registered_at) candidate.recruiter_registered_at = today();
    candidate._mobi_recruiter_locked = true;
    return true;
  }

  function stampNewCandidates(beforeMap, explicitCandidate) {
    var changed = false;
    if (explicitCandidate && typeof explicitCandidate === 'object') {
      changed = stampRecruiter(explicitCandidate, false) || changed;
    }
    (window.CANDIDATES || []).forEach(function (candidate) {
      var key = candidateIdentity(candidate);
      if (key && beforeMap[key]) return;
      changed = stampRecruiter(candidate, false) || changed;
    });
    if (changed) {
      try { if (typeof saveData === 'function') saveData(); } catch (e) {}
      try { if (typeof renderCurrentPage === 'function') renderCurrentPage(); } catch (e) {}
    }
    return changed;
  }

  function installSaveWrapper() {
    if (installed || typeof window.saveNewPerson !== 'function') return false;
    installed = true;
    var previous = window.saveNewPerson;
    window.saveNewPerson = function () {
      var beforeMap = Object.create(null);
      (window.CANDIDATES || []).forEach(function (candidate) {
        var key = candidateIdentity(candidate);
        if (key) beforeMap[key] = true;
      });
      var result = previous.apply(this, arguments);
      stampNewCandidates(beforeMap, result);
      return result;
    };
    try { saveNewPerson = window.saveNewPerson; } catch (e) {}
    return true;
  }

  function installCardWrapper() {
    if (typeof window.renderCandidateCard !== 'function' || window.renderCandidateCard.__mobiRecruiter121) return;
    var previous = window.renderCandidateCard;
    window.renderCandidateCard = function (candidate, showTrainingPanel) {
      var html = previous.apply(this, arguments);
      if (html && html.indexOf('data-mobi-recruiter-line') !== -1) return html;
      var name = clean(candidate && (candidate.recruiter_name || candidate.recruited_by_name || candidate.recrutador_nome), 120).toUpperCase();
      var line = '<span data-mobi-recruiter-line class="text-[9px] text-muted block mt-0.5">Recrutador: <b class="text-on-surface">' + esc(name || 'NAO REGISTRADO') + '</b></span>';
      if (html && /Recrutado em[^<]*<\/span>/.test(html)) {
        return html.replace(/(<span class="text-\[9px\] text-muted">Recrutado em[^<]*<\/span>)/, '$1' + line);
      }
      return String(html || '').replace('</h4>', '</h4>' + line);
    };
    window.renderCandidateCard.__mobiRecruiter121 = true;
    try { renderCandidateCard = window.renderCandidateCard; } catch (e) {}
  }

  function install() {
    installSaveWrapper();
    installCardWrapper();
  }

  install();
  var timer = setInterval(function () {
    install();
    if (installed) clearInterval(timer);
  }, 200);
  setTimeout(function () { clearInterval(timer); install(); }, 6000);

  window.MobilizaProRecruiterAudit = {
    currentRecruiter: currentRecruiter,
    stampCandidate: function (id, force) {
      var candidate = (window.CANDIDATES || []).find(function (item) { return String(item.id) === String(id) || String(item.client_uid || item._mobi_uid || '') === String(id); });
      var ok = stampRecruiter(candidate, !!force);
      if (ok) {
        try { if (typeof saveData === 'function') saveData(); } catch (e) {}
        try { if (typeof renderCurrentPage === 'function') renderCurrentPage(); } catch (e) {}
      }
      return { ok: ok, candidate: candidate || null };
    },
    list: function () {
      return (window.CANDIDATES || []).map(function (candidate) {
        return {
          id: candidate.id,
          client_uid: candidate.client_uid || candidate._mobi_uid || '',
          name: candidate.name,
          cpf: candidate.cpf,
          recruiter_name: candidate.recruiter_name || candidate.recruited_by_name || candidate.recrutador_nome || '',
          recruiter_cpf: candidate.recruiter_cpf || candidate.recruited_by_cpf || candidate.recrutador_cpf || ''
        };
      });
    }
  };
})();
