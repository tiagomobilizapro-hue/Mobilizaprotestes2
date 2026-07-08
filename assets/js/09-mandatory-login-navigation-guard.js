
(function(){
  function safeUser(){ try { return typeof getCurrentAccessUser === 'function' ? getCurrentAccessUser() : null; } catch(e){ return null; } }
  function goAccess(){
    try { if (typeof currentPage !== 'undefined') currentPage = 'acesso'; } catch(e){}
    try {
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      const access = document.getElementById('page-acesso');
      if (access) access.classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === 'acesso'));
      const title = document.getElementById('topbar-title');
      if (title) title.textContent = 'Acesso';
      if (typeof renderAcesso === 'function') renderAcesso();
      if (typeof updateAccessBadge === 'function') updateAccessBadge();
    } catch(e){}
    return false;
  }
  const previousSelect = typeof selectPage === 'function' ? selectPage : null;
  window.selectPage = selectPage = function(page){
    page = String(page || 'dashboard');
    if (page !== 'acesso' && !safeUser()) return goAccess();
    return previousSelect ? previousSelect(page) : undefined;
  };
  window.addEventListener('click', function(ev){
    const item = ev.target && ev.target.closest ? ev.target.closest('.nav-item[data-page]') : null;
    if (!item) return;
    const page = item.dataset.page || '';
    if (page !== 'acesso' && !safeUser()) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      goAccess();
    }
  }, true);
  setTimeout(function(){ if (!safeUser()) goAccess(); }, 40);
})();
