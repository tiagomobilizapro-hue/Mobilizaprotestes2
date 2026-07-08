
// Refinamento de bloqueio visual e proteção para ações de vagas/solicitações.
const __mobiOpenCancelSolicitationModal = typeof openCancelSolicitationModal === 'function' ? openCancelSolicitationModal : null;
if (__mobiOpenCancelSolicitationModal) openCancelSolicitationModal = function(...args) { if (!isGerencial()) return accessDenied('vagas'); return __mobiOpenCancelSolicitationModal.apply(this, args); };
const __mobiCancelSolicitation = typeof cancelSolicitation === 'function' ? cancelSolicitation : null;
if (__mobiCancelSolicitation) cancelSolicitation = function(...args) { if (!isGerencial()) return accessDenied('solicitacao'); return __mobiCancelSolicitation.apply(this, args); };

const __mobiOriginalApplyPermissionLock = typeof applyPermissionLock === 'function' ? applyPermissionLock : null;
applyPermissionLock = function() {
    if (__mobiOriginalApplyPermissionLock) __mobiOriginalApplyPermissionLock();
    const pageEl = document.getElementById(`page-${currentPage}`);
    if (!pageEl || currentPage === 'acesso' || currentPage === 'manutencao') return;
    if (canEditPage(currentPage) || isGerencial()) return;
    pageEl.querySelectorAll('button').forEach(btn => {
        const onclick = String(btn.getAttribute('onclick') || '');
        const txt = String(btn.textContent || '').trim().toUpperCase();
        const editAction = /(openAddPersonModal|openEditPersonModal|openNewSolicitation|openNewFunction|openCancelSolicitation|saveNew|delete|cancelSolicitation|decline|openDeclineCandidateModal|openRecruitmentFromVacancy|create|remove|updateBadge|updateCandidateAlojamento)/i.test(onclick)
            || /(NOVO|NOVA|EDITAR|RECRUTAR|DECLINADO|REMOVER|CANCELADO|SALVAR|CONFIRMAR|EXCLUIR)/.test(txt);
        if (editAction) {
            btn.disabled = true;
            btn.classList.add('locked-control');
            btn.title = 'Somente visualização para o perfil atual.';
        }
    });
};
setTimeout(() => { updateAccessBadge?.(); applyPermissionLock?.(); }, 100);
