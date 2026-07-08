
/* ============================================================
   MOBILIZAPRO — CORREÇÃO DO FLUXO CADASTRAR COLABORADOR
   ============================================================ */
(function(){
    function mproHasEditPermissionForNewPerson() {
        try {
            if (typeof isGerencial === 'function' && isGerencial()) return true;
            if (typeof canEditPage === 'function' && canEditPage('recrutamento')) return true;
            return false;
        } catch(e) { return false; }
    }

    function mproRequiredTrainingsForFunction(func) {
        const matrix = (TRAINING_MATRIX || []).find(f => f.function === func);
        return (matrix?.trainings || []).filter(t => t.required !== 'E');
    }

    function mproPlannedTrainingStart(admissionPlanned) {
        return admissionPlanned ? addBusinessDaysToInputDate(admissionPlanned, 1) : null;
    }

    function mproPlannedTrainingEnd(func, trainingStart) {
        const matrix = (TRAINING_MATRIX || []).find(f => f.function === func);
        if (!trainingStart || !matrix) return null;
        const days = Math.max(1, Math.ceil(Number(matrix.days || 1)));
        return addBusinessDaysToInputDate(trainingStart, days);
    }

    window.saveNewPerson = saveNewPerson = function() {
        if (!mproHasEditPermissionForNewPerson()) {
            return typeof accessDenied === 'function' ? accessDenied('recrutamento') : alert('Perfil sem permissão para cadastrar colaborador.');
        }

        updateNewPersonRecruitmentDates();

        const name = cleanString(document.getElementById('p-name')?.value || '', 100).toUpperCase();
        const cpf = onlyDigits(document.getElementById('p-cpf')?.value || '').slice(0, 11);
        const phone = onlyDigits(document.getElementById('p-phone')?.value || '').slice(0, 11);
        const city = cleanString(document.getElementById('p-city')?.value || '', 80).toUpperCase();
        const state = cleanString(document.getElementById('p-state')?.value || '', 2).toUpperCase();
        const func = cleanString(document.getElementById('p-func')?.value || '', 80).toUpperCase();
        const rm = cleanString(document.getElementById('p-rm')?.value || '', 24).replace(/\D/g, '');
        const digitalObra = cleanAlphanumeric(document.getElementById('p-digital-obra')?.value || '', 40);
        const recruited = cleanDate(document.getElementById('p-recruited')?.value || '');
        const asoPlanned = cleanDate(document.getElementById('p-aso-planned')?.value || '');
        const admissionPlanned = cleanDate(document.getElementById('p-admission-planned')?.value || '');
        const asoReal = cleanDate(document.getElementById('p-aso-real')?.value || '') || null;
        const admittedReal = cleanDate(document.getElementById('p-admitted-real')?.value || '') || null;
        const flowError = typeof validatePersonFlow === 'function' ? validatePersonFlow(recruited, asoReal, admittedReal) : '';

        if (name.length < 3) return alert("Preencha o nome completo com pelo menos 3 caracteres.");
        if (cpf.length !== 11) return alert("Informe um CPF com 11 numeros.");
        if (phone.length !== 11) return alert("Informe um celular valido com DDD e 9 digitos.");
        if (!city) return alert("Informe a cidade natal.");
        if (state.length !== 2) return alert("Informe o estado com 2 letras.");
        if (!func || !(TRAINING_MATRIX || []).some(f => f.function === func)) return alert("Selecione uma função válida.");
        if (!recruited) return alert("Informe a data de recrutamento.");
        if (!asoPlanned || !admissionPlanned) return alert("Nao foi possivel calcular ASO previsto e Admissao prevista para a funcao selecionada.");
        if (flowError) return alert(flowError);
        if (rm && !digitalObra) return alert("Informe a Obra Vinculada da RM.");
        if (digitalObra && !rm) return alert("Informe a RM vinculada à Obra Vinculada.");

        const linkedVacancy = typeof getVacancyRowByLink === 'function' ? getVacancyRowByLink(func, rm, digitalObra) : null;
        if (linkedVacancy && linkedVacancy.open <= 0 && linkedVacancy.requested > 0) {
            return alert(`Nao ha saldo disponivel para RM ${linkedVacancy.rm} / ${linkedVacancy.digital_obra}.`);
        }

        if ((CANDIDATES || []).some(c => onlyDigits(c.cpf) === cpf)) {
            return alert("Ja existe uma pessoa cadastrada com este CPF.");
        }

        const trainingStartPlanned = mproPlannedTrainingStart(admissionPlanned);
        const trainingEndPlanned = mproPlannedTrainingEnd(func, trainingStartPlanned);

        const newCandidate = {
            id: nextCandidateId(),
            name,
            cpf,
            phone,
            city,
            state,
            func,
            rm,
            digital_obra: digitalObra,
            recruited,
            aso_planned: asoPlanned,
            admission_planned: admissionPlanned,
            aso: asoReal,
            admitted: admittedReal,
            training_start_planned: trainingStartPlanned,
            training_start_real: null,
            training_end_planned: trainingEndPlanned,
            training_end_real: null,
            badge_ok: false,
            badge_posted_date: null,
            badge_release_days: BADGE_RELEASE_DAYS_DEFAULT,
            badge_real_date: null,
            badge_delay_reason: "",
            alojado: false,
            alojamento_lancado_em: null,
            alojamento_realizado: 'NAO',
            alojamento_responsavel: '',
            declined_date: null,
            declined_reason: "",
            trainings: [],
            lastStageUpdate: admittedReal || asoReal || recruited
        };

        CANDIDATES.push(newCandidate);

        if (typeof syncBadgeQueueForCandidate === 'function') syncBadgeQueueForCandidate(newCandidate);
        if (typeof sortTrainingMatrixByFunction === 'function') sortTrainingMatrixByFunction();
        saveData();
        closeModal();

        if (admittedReal && typeof selectPage === 'function') {
            selectPage('mobilizacao');
        } else {
            renderCurrentPage();
        }

        setTimeout(() => {
            try {
                if (typeof updateVacancyBadge === 'function') updateVacancyBadge();
                if (typeof updateAlertIcon === 'function') updateAlertIcon();
                if (typeof applyPermissionLock === 'function') applyPermissionLock();
            } catch(e) {}
        }, 0);

        return newCandidate;
    };
})();
