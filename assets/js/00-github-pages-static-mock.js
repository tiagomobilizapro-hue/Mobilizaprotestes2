/* MobilizaPRO - Login demonstrativo para GitHub Pages.
   Não roda na Hostinger. Só libera login visual em github.io. */
(function () {
  'use strict';

  var isGithubPages = /(^|\.)github\.io$/i.test(location.hostname || '');
  if (!isGithubPages) return;

  window.MOBI_GITHUB_PAGES_STATIC = true;
  window.MOBI_CSRF_TOKEN = 'github-pages-demo-csrf';

  var SESSION_KEY = 'mobilizapro-github-pages-demo-session-v1';

  var DEMO_USER = {
    id: 1,
    name: 'Administrador Demo',
    cpf: '00000000000',
    email: 'demo@mobilizapro.local',
    role: 'GERENCIAL',
    active: 1
  };

  function onlyCpf(value) {
    return String(value || '').replace(/\D/g, '').slice(0, 11);
  }

  function readBody(init) {
    if (!init || !init.body) return {};
    try {
      return JSON.parse(init.body || '{}');
    } catch (e) {
      return {};
    }
  }

  function response(payload, status) {
    return Promise.resolve(
      new Response(JSON.stringify(payload || {}), {
        status: status || 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    );
  }

  function currentUser() {
    try {
      return localStorage.getItem(SESSION_KEY) === '1' ? DEMO_USER : null;
    } catch (e) {
      return null;
    }
  }

  var originalFetch = window.fetch;

  window.fetch = function (input, init) {
    var url = String((input && input.url) || input || '');

    if (url.indexOf('api/auth.php') !== -1) {
      var action = 'status';

      try {
        action = new URL(url, location.href).searchParams.get('action') || 'status';
      } catch (e) {}

      if (action === 'status') {
        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN,
          environment: 'github-pages-demo'
        });
      }

      if (action === 'me') {
        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN,
          user: currentUser()
        });
      }

      if (action === 'login') {
        var data = readBody(init);
        var cpfOk = onlyCpf(data.cpf) === '00000000000';
        var senhaOk = String(data.password || '') === '123456';

        if (!cpfOk || !senhaOk) {
          return response({
            ok: false,
            message: 'Usuário de demonstração: CPF 000.000.000-00 e senha 123456.'
          }, 401);
        }

        try {
          localStorage.setItem(SESSION_KEY, '1');
        } catch (e) {}

        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN,
          user: DEMO_USER
        });
      }

      if (action === 'logout') {
        try {
          localStorage.removeItem(SESSION_KEY);
        } catch (e) {}

        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN
        });
      }

      if (action === 'users') {
        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN,
          users: [DEMO_USER]
        });
      }

      if (
        action === 'save_user' ||
        action === 'delete_user' ||
        action === 'import_local_users'
      ) {
        return response({
          ok: true,
          csrf: window.MOBI_CSRF_TOKEN,
          message: 'Ação simulada no GitHub Pages.'
        });
      }

      return response({
        ok: true,
        csrf: window.MOBI_CSRF_TOKEN
      });
    }

    return originalFetch.apply(this, arguments);
  };

  window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('mpro-github-pages-demo-login');
  });
})();
