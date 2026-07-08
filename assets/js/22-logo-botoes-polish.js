(function(){
  'use strict';

  const LOGO_WIDE = 'assets/img/mobilizapro-logo-hq.png?v=20260703-hq1';
  const LOGO_ICON = 'assets/img/mobilizapro-icon-hq.png?v=20260703-hq1';

  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function txt(el){ return (el && el.textContent || '').replace(/\s+/g,' ').trim(); }

  function replaceSidebarLogo(){
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const header = sidebar.querySelector(':scope > div');
    if (header) header.classList.add('mpro-brand-header');
    const row = header ? header.querySelector('.flex.items-center') : sidebar.querySelector('.flex.items-center');
    if (!row || row.dataset.mproLogoHq === '1') return;
    row.dataset.mproLogoHq = '1';
    row.innerHTML = `
      <div class="mpro-brand-lockup" title="MobilizaPro">
        <img src="${LOGO_WIDE}" alt="MobilizaPRO" class="mpro-brand-logo-img" loading="eager">
      </div>
    `;
  }

  function replaceLoginLogos(){
    qsa('img[alt="MobilizaPRO"], img.login-logo, .login-card img').forEach(img => {
      if (img.dataset.mproLogoHq === '1') return;
      img.dataset.mproLogoHq = '1';
      img.src = LOGO_WIDE;
      img.style.objectFit = 'contain';
      img.style.imageRendering = 'auto';
      img.loading = 'eager';
    });
    // Caso algum patch crie logo por background/base64, insere a versão nítida no bloco oficial.
    qsa('[data-mpro-login-logo="1"]').forEach(block => {
      const img = block.querySelector('img');
      if (img) {
        img.src = LOGO_WIDE;
        img.classList.add('mpro-login-logo-hq');
      }
    });
  }

  function hideTopbarAction(){
    const btn = document.getElementById('topbar-action-btn');
    if (btn) {
      btn.classList.add('hidden');
      btn.style.display = 'none';
      btn.onclick = null;
      btn.setAttribute('aria-hidden', 'true');
    }
  }

  function polishActionButton(button, kind='nova-rm'){
    if (!button) return;
    button.dataset.mproAction = kind;
    button.classList.add('mpro-action-primary');
    button.classList.remove('text-xs');
    const label = kind === 'nova-vaga' ? 'Nova Vaga' : 'Nova RM';
    const icon = kind === 'nova-vaga' ? 'add_business' : 'add_circle';
    if (!button.dataset.mproLabelFixed) {
      button.dataset.mproLabelFixed = '1';
      button.innerHTML = `<span class="material-symbols-outlined">${icon}</span> ${label}`;
    }
  }

  function polishSecondaryButton(button){
    if (!button) return;
    button.classList.add('mpro-action-secondary');
    button.classList.remove('text-xs');
  }

  function polishSolicitacao(){
    const page = document.getElementById('page-solicitacao');
    if (!page || page.classList.contains('hidden')) return;
    const novaRmButtons = qsa('button', page).filter(b => /Nova\s+RM/i.test(txt(b)) || /openNewSolicitationModal/.test(b.getAttribute('onclick') || ''));
    novaRmButtons.forEach(b => polishActionButton(b, 'nova-rm'));
    const header = novaRmButtons[0]?.closest('.flex.justify-between, .flex.flex-col.md\\:flex-row, .flex.flex-col.lg\\:flex-row');
    if (header) header.classList.add('mpro-page-commandbar');
  }

  function polishVagas(){
    const page = document.getElementById('page-vagas');
    if (!page || page.classList.contains('hidden')) return;
    const buttons = qsa('button', page);
    buttons.filter(b => /Nova\s+RM/i.test(txt(b)) || /openNewSolicitationModal/.test(b.getAttribute('onclick') || '')).forEach(b => polishActionButton(b, 'nova-rm'));
    buttons.filter(b => /Abrir\s+Recrutamento/i.test(txt(b))).forEach(polishSecondaryButton);
    const header = buttons[0]?.closest('.flex.flex-col.md\\:flex-row, .flex.flex-col.lg\\:flex-row, .flex.justify-between');
    if (header) header.classList.add('mpro-page-commandbar');
  }

  function polishAll(){
    replaceSidebarLogo();
    replaceLoginLogos();
    hideTopbarAction();
    polishSolicitacao();
    polishVagas();
  }

  // Blindagem: alguns scripts antigos tentam reexibir o botão do topo após selectPage.
  const oldSelectPage = window.selectPage;
  if (typeof oldSelectPage === 'function' && !oldSelectPage.__mproLogoButtonsPatched) {
    const wrapped = function(page){
      const ret = oldSelectPage.apply(this, arguments);
      setTimeout(polishAll, 30);
      setTimeout(polishAll, 220);
      return ret;
    };
    wrapped.__mproLogoButtonsPatched = true;
    window.selectPage = wrapped;
  }

  const oldRenderCurrentPage = window.renderCurrentPage;
  if (typeof oldRenderCurrentPage === 'function' && !oldRenderCurrentPage.__mproLogoButtonsPatched) {
    const wrappedRender = function(){
      const ret = oldRenderCurrentPage.apply(this, arguments);
      setTimeout(polishAll, 30);
      return ret;
    };
    wrappedRender.__mproLogoButtonsPatched = true;
    window.renderCurrentPage = wrappedRender;
  }

  window.addEventListener('load', () => {
    polishAll();
    setTimeout(polishAll, 250);
    setTimeout(polishAll, 900);
  });

  const obs = new MutationObserver(() => {
    clearTimeout(window.__mproLogoButtonsTimer);
    window.__mproLogoButtonsTimer = setTimeout(polishAll, 80);
  });
  window.addEventListener('DOMContentLoaded', () => {
    if (document.body) obs.observe(document.body, {childList:true, subtree:true});
  });
})();
