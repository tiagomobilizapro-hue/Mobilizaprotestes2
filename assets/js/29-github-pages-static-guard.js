/* MobilizaPRO - guarda visual para GitHub Pages.
   GitHub Pages é estático: esta camada deixa claro que o ambiente é demonstrativo. */
(function(){
  'use strict';
  var isGithubPages = /(^|\.)github\.io$/i.test(location.hostname || '');
  document.documentElement.classList.add('dark');

  function fixLogo(){
    document.querySelectorAll('img[alt="Logo"]').forEach(function(img){
      var src = img.getAttribute('src') || '';
      if(src.indexOf('googleusercontent.com') !== -1 || !src){
        img.setAttribute('src','assets/img/mobilizapro-logo-hq.png');
      }
      img.onerror = function(){
        this.onerror = null;
        this.setAttribute('src','assets/img/mobilizapro-logo-hq.png');
      };
    });
  }

  function markPreview(){
    if(!isGithubPages) return;
    if (document.body) document.body.classList.add('mpro-github-pages-preview');
    var status = document.querySelector('#sidebar .p-4.border-t, .sidebar .p-4.border-t');
    if(status && !status.dataset.githubPreview){
      status.dataset.githubPreview = '1';
      status.innerHTML = '<div class="flex items-center gap-2 mb-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span><span class="font-medium">Prévia GitHub ativa</span></div><p>Ambiente visual sem PHP/MySQL real</p>';
    }
    document.querySelectorAll('#page-acesso p, #page-acesso .text-muted').forEach(function(el){
      if (/Login conectado ao MySQL da Hostinger/i.test(el.textContent || '')) {
        el.textContent = 'Login demonstrativo para prévia visual no GitHub Pages.';
      }
      if (/Sessão protegida no servidor/i.test(el.textContent || '')) {
        el.textContent = 'Sessão simulada localmente nesta prévia visual.';
      }
      if (/Gravação direta no banco MySQL da Hostinger/i.test(el.textContent || '')) {
        el.textContent = 'Cadastro simulado; para gravar de verdade, use a Hostinger/homologação.';
      }
    });
    var title = document.querySelector('#page-acesso h3');
    if (title && /MobilizaPro Online/i.test(title.textContent || '')) title.textContent = 'MobilizaPro · Prévia GitHub';
  }

  function loop(){ fixLogo(); markPreview(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loop); else loop();
  if(isGithubPages) setInterval(loop, 800);
})();
