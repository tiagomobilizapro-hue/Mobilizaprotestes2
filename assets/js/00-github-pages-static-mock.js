/* MobilizaPRO - mock estático para GitHub Pages.
   GitHub Pages não executa PHP/MySQL. Este arquivo simula respostas mínimas
   para permitir login de demonstração e navegação visual. Não roda na Hostinger. */
(function () {
  'use strict';

  var isGithubPages = /(^|\.)github\.io$/i.test(location.hostname || '');
  if (!isGithubPages) return;

  window.MOBI_GITHUB_PAGES_STATIC = true;
  window.MOBI_CSRF_TOKEN = 'github-pages-demo-csrf';

  var STATE_KEY = 'mobilizaprp-state-v3';
  var SESSION_KEY = 'mobilizapro-github-pages-demo-session-v1';
  var DEMO_USER = {
    id: 1,
    name: 'Administrador Demo',
    cpf: '00000000000',
    email: 'demo@mobilizapro.local',
    role: 'GERENCIAL',
    active: 1
  };

  function cpf(value) {
    return String(value || '').replace(/\D/g, '').slice(0, 11);
  }

  function readBody(init) {
    if (!init || !init.body) return {};
    try { return JSON.parse(init.body || '{}'); } catch (e) { return {}; }
  }

  function jsonResponse(payload, status) {
    var body = JSON.stringify(payload || {});
    if (typeof Response === 'function') {
      return Promise.resolve(new Response(body, {
        status: status || 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }));
    }
    return Promise.resolve({
      ok: !status || status < 400,
      status: status || 200,
      json: function () { return Promise.resolve(payload || {}); },
      text: function () { return Promise.resolve(body); }
    });
  }

  function currentUser() {
    try {
      return localStorage.getItem(SESSION_KEY) === '1' ? DEMO_USER : null;
    } catch (e) { return null; }
  }

  var nativeFetch = window.fetch;
  if (typeof nativeFetch === 'function') {
    window.fetch = function (input, init) {
      var url = String((input && input.url) || input || '');
      if (url.indexOf('api/auth.php') !== -1) {
        var action = 'status';
        try { action = new URL(url, location.href).searchParams.get('action') || 'status'; } catch (e) {}
        var data = readBody(init);

        if (action === 'status') return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN, environment: 'github-pages-demo' });
        if (action === 'me') return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN, user: currentUser() });
        if (action === 'login') {
          var validCpf = cpf(data.cpf) === '00000000000';
          var validPass = String(data.password || '') === '123456';
          if (!validCpf || !validPass) {
            return jsonResponse({ ok: false, message: 'Usuário de demonstração: CPF 000.000.000-00 e senha 123456.' }, 401);
          }
          try { localStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
          return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN, user: DEMO_USER });
        }
        if (action === 'logout') {
          try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
          return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN });
        }
        if (action === 'users') {
          return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN, users: [DEMO_USER] });
        }
        if (action === 'save_user' || action === 'delete_user' || action === 'import_local_users') {
          return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN, message: 'Ação simulada no GitHub Pages.' });
        }
        return jsonResponse({ ok: true, csrf: window.MOBI_CSRF_TOKEN });
      }
      return nativeFetch.apply(this, arguments);
    };
  }

  var NativeXHR = window.XMLHttpRequest;
  if (typeof NativeXHR === 'function') {
    function DemoXHR() {
      this._xhr = new NativeXHR();
      this._mock = false;
      this._headers = {};
      this._method = 'GET';
      this._url = '';
      this._async = true;
      this.onreadystatechange = null;
      this.onload = null;
      this.onerror = null;
      this.readyState = 0;
      this.status = 0;
      this.responseText = '';
      this.response = '';
      var self = this;
      this._xhr.onreadystatechange = function () {
        self.readyState = self._xhr.readyState;
        self.status = self._xhr.status;
        self.responseText = self._xhr.responseText;
        self.response = self._xhr.response;
        if (typeof self.onreadystatechange === 'function') self.onreadystatechange.call(self);
      };
      this._xhr.onload = function () { if (typeof self.onload === 'function') self.onload.call(self); };
      this._xhr.onerror = function () { if (typeof self.onerror === 'function') self.onerror.call(self); };
    }
    DemoXHR.prototype.open = function (method, url, async) {
      this._method = method || 'GET';
      this._url = String(url || '');
      this._async = async !== false;
      this._mock = this._url.indexOf('api/store.php') !== -1;
      if (!this._mock) return this._xhr.open.apply(this._xhr, arguments);
      this.readyState = 1;
    };
    DemoXHR.prototype.setRequestHeader = function (name, value) {
      if (this._mock) { this._headers[name] = value; return; }
      return this._xhr.setRequestHeader.apply(this._xhr, arguments);
    };
    DemoXHR.prototype.getResponseHeader = function (name) {
      if (this._mock && String(name || '').toLowerCase() === 'content-type') return 'application/json; charset=utf-8';
      return this._xhr.getResponseHeader.apply(this._xhr, arguments);
    };
    DemoXHR.prototype.getAllResponseHeaders = function () {
      if (this._mock) return 'content-type: application/json; charset=utf-8\r\n';
      return this._xhr.getAllResponseHeaders.apply(this._xhr, arguments);
    };
    DemoXHR.prototype.abort = function () {
      if (this._mock) return;
      return this._xhr.abort.apply(this._xhr, arguments);
    };
    DemoXHR.prototype.send = function (payload) {
      if (!this._mock) return this._xhr.send.apply(this._xhr, arguments);
      var out = { ok: true, token: 'github-pages-demo-token', items: {} };
      try {
        var url = new URL(this._url, location.href);
        var action = url.searchParams.get('action') || '';
        if (this._method.toUpperCase() === 'POST' || action === 'save_state') {
          var body = {};
          try { body = JSON.parse(payload || '{}'); } catch (e) {}
          if (body.state) localStorage.setItem(STATE_KEY, JSON.stringify(body.state || {}));
          out.message = 'Salvo apenas no navegador nesta prévia do GitHub Pages.';
        } else {
          var stateRaw = localStorage.getItem(STATE_KEY) || '';
          out.items[STATE_KEY] = stateRaw;
        }
      } catch (e) {
        out = { ok: false, message: e.message || 'Falha no mock estático.' };
      }
      var done = function (self) {
        self.status = out.ok ? 200 : 500;
        self.readyState = 4;
        self.responseText = JSON.stringify(out);
        self.response = self.responseText;
        if (typeof self.onreadystatechange === 'function') self.onreadystatechange.call(self);
        if (typeof self.onload === 'function') self.onload.call(self);
      };
      if (this._async) setTimeout(done, 0, this); else done(this);
    };
    Object.defineProperty(DemoXHR.prototype, 'withCredentials', {
      get: function () { return this._mock ? false : this._xhr.withCredentials; },
      set: function (v) { if (!this._mock) this._xhr.withCredentials = v; }
    });
    window.XMLHttpRequest = DemoXHR;
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('mpro-github-pages-demo-login');
  });
})();
