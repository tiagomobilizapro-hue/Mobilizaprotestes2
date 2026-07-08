
/* ============================================================
   MOBILIZAPRO
   1) Menu: Solicitação M.O. antes de Recrutamento
   2) Cadastro: RM vinculada por lista suspensa com baixa por saldo
   ============================================================ */
(function(){
    function mproEsc(v) {
        return (typeof escapeHtml === 'function') ? escapeHtml(v) : String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    }

    function mproAttr(v) {
        return mproEsc(v).replace(/`/g, '&#96;');
    }

    function mproVacancyValue(row) {
        return [row?.rm || '', row?.digital_obra || '', row?.func || ''].map(v => String(v ?? '').replace(/\|/g, '/')).join('|||');
    }

    function mproParseVacancyValue(value) {
        const parts = String(value || '').split('|||');
        return {
            rm: cleanString(parts[0] || '', 24).replace(/\D/g, ''),
            digital_obra: cleanAlphanumeric(parts[1] || '', 40),
            func: cleanString(parts[2] || '', 80).toUpperCase()
        };
    }

    function mproVacancyRowsForDropdown(selectedValue = '') {
        const selected = mproParseVacancyValue(selectedValue);
        const selectedKey = selected.rm && selected.digital_obra && selected.func
            ? getVacancyKey(selected.rm, selected.digital_obra, selected.func)
            : '';

        return getVacancyRows()
            .filter(row => row.requested > 0 && !row.sem_rm)
            .filter(row => row.open > 0 || row.key === selectedKey)
            .sort((a, b) =>
                String(a.rm || '').localeCompare(String(b.rm || ''), 'pt-BR', { numeric: true }) ||
                String(a.digital_obra || '').localeCompare(String(b.digital_obra || ''), 'pt-BR', { sensitivity: 'base' }) ||
                String(a.func || '').localeCompare(String(b.func || ''), 'pt-BR', { sensitivity: 'base' })
            );
    }

    window.mproMoveSolicitacaoBeforeRecrutamento = function() {
        try {
            const solicitacao = document.querySelector('.nav-item[data-page="solicitacao"]');
            const recrutamento = document.querySelector('.nav-item[data-page="recrutamento"]');
            if (solicitacao && recrutamento && solicitacao !== recrutamento.previousElementSibling) {
                recrutamento.parentNode.insertBefore(solicitacao, recrutamento);
                solicitacao.classList.add('mpro-menu-prioritario');
            }
        } catch(e) {}
    };

    window.mproApplyVacancySelection = function(value) {
        const parsed = mproParseVacancyValue(value);
        const funcInput = document.getElementById('p-func');
        const rmInput = document.getElementById('p-rm');
        const obraInput = document.getElementById('p-digital-obra');
        const info = document.getElementById('p-vacancy-link-info');

        if (!value || !parsed.rm || !parsed.digital_obra || !parsed.func) {
            if (rmInput) rmInput.value = '';
            if (obraInput) obraInput.value = '';
            if (info) info.innerHTML = 'Sem RM vinculada. O cadastro não dará baixa em solicitação de mão de obra.';
            if (funcInput) funcInput.disabled = false;
            if (typeof updateNewPersonRecruitmentDates === 'function') updateNewPersonRecruitmentDates();
            return;
        }

        if (funcInput) {
            funcInput.value = parsed.func;
            funcInput.disabled = true;
        }
        if (rmInput) rmInput.value = parsed.rm;
        if (obraInput) obraInput.value = parsed.digital_obra;

        const row = getVacancyRowByLink(parsed.func, parsed.rm, parsed.digital_obra);
        if (info) {
            if (row) {
                info.innerHTML = `RM <b>${mproEsc(row.rm)}</b> • Obra <b>${mproEsc(row.digital_obra)}</b> • Função <b>${mproEsc(row.func)}</b> • Saldo disponível <b>${row.open}</b> de ${row.requested}. Ao salvar, este colaborador será vinculado e dará baixa automática no saldo.`;
            } else {
                info.innerHTML = 'RM selecionada não localizada no saldo atual. Revise a solicitação.';
            }
        }

        if (typeof updateNewPersonRecruitmentDates === 'function') updateNewPersonRecruitmentDates();
    };

    function mproBuildVacancyOptions(selectedValue = '') {
        const rows = mproVacancyRowsForDropdown(selectedValue);
        if (!rows.length) return '<option value="">Nenhuma RM com saldo em aberto</option>';
        return rows.map(row => {
            const value = mproVacancyValue(row);
            const label = `RM ${row.rm || '-'} • ${row.digital_obra || 'SEM OBRA'} • ${row.func || '-'} • Saldo ${row.open}/${row.requested}`;
            return `<option value="${mproAttr(value)}" ${value === selectedValue ? 'selected' : ''}>${mproEsc(label)}</option>`;
        }).join('');
    }

    window.openAddPersonModal = openAddPersonModal = function(preselectedFunc = '', preselectedRm = '', preselectedDigitalObra = '') {
        const normalizedPreselectedFunc = cleanString(preselectedFunc, 80).toUpperCase();
        const rmClean = cleanString(preselectedRm, 24).replace(/\D/g, '');
        const obraClean = cleanAlphanumeric(preselectedDigitalObra, 40);
        const preRow = rmClean && obraClean && normalizedPreselectedFunc ? getVacancyRowByLink(normalizedPreselectedFunc, rmClean, obraClean) : null;
        const selectedVacancyValue = preRow ? mproVacancyValue(preRow) : '';
        const defaultFunc = preRow?.func || (TRAINING_MATRIX.some(f => f.function === normalizedPreselectedFunc) ? normalizedPreselectedFunc : (TRAINING_MATRIX[0]?.function || ''));
        const dropdownRows = mproVacancyRowsForDropdown(selectedVacancyValue);

        openModal(`
            <div class="p-6 border-b border-outline-variant flex justify-between items-center">
                <div>
                    <h3 class="font-display font-bold text-lg">Cadastrar Novo Colaborador</h3>
                    <p class="text-xs text-muted mt-1">Selecione a RM vinculada para baixar automaticamente a quantidade solicitada.</p>
                </div>
                <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
            </div>

            <div class="p-6 space-y-4 overflow-y-auto">
                <div class="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM vinculada / baixa da solicitação M.O.</label>
                    <select id="p-vacancy-link" class="modal-input font-mono" onchange="mproApplyVacancySelection(this.value)" ${dropdownRows.length ? '' : 'disabled'}>
                        <option value="">SEM RM VINCULADA</option>
                        ${mproBuildVacancyOptions(selectedVacancyValue)}
                    </select>
                    <p id="p-vacancy-link-info" class="text-[11px] text-muted mt-2">
                        ${selectedVacancyValue ? 'RM vinculada selecionada. Ao salvar, o colaborador dará baixa automática no saldo solicitado.' : 'Selecione uma RM com saldo para vincular o colaborador à solicitação e baixar a quantidade.'}
                    </p>
                    <input type="hidden" id="p-rm" value="${mproAttr(preRow?.rm || rmClean)}">
                    <input type="hidden" id="p-digital-obra" value="${mproAttr(preRow?.digital_obra || obraClean)}">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome Completo *</label>
                        <input type="text" id="p-name" class="modal-input uppercase" placeholder="EX: JOAO DA SILVA" maxlength="100" oninput="maskUppercaseInput(this, 100)" required>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF *</label>
                        <input type="text" id="p-cpf" class="modal-input" placeholder="000.000.000-00" inputmode="numeric" maxlength="14" oninput="maskCpfInput(this)" required>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Telefone *</label>
                        <input type="tel" id="p-phone" class="modal-input" placeholder="(00) 00000-0000" inputmode="numeric" maxlength="15" oninput="maskPhoneInput(this)" required>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Cidade Natal *</label>
                        <input type="text" id="p-city" class="modal-input uppercase" placeholder="EX: BELO HORIZONTE" maxlength="80" oninput="maskUppercaseInput(this, 80)" required>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Estado *</label>
                        <input type="text" id="p-state" class="modal-input uppercase" placeholder="UF" maxlength="2" oninput="maskUppercaseInput(this, 2)" required>
                    </div>
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Função *</label>
                        <select id="p-func" class="modal-input" onchange="updateNewPersonRecruitmentDates()" required ${selectedVacancyValue ? 'disabled' : ''}>
                            ${TRAINING_MATRIX.map(f => `<option value="${mproEsc(f.function)}" ${f.function === defaultFunc ? 'selected' : ''}>${mproEsc(f.function)}</option>`).join('')}
                        </select>
                        <p class="text-[10px] text-muted mt-1">Quando uma RM é selecionada, a função passa a ser definida pela solicitação.</p>
                    </div>
                    <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM selecionada</label>
                            <input type="text" class="modal-input font-mono" value="${mproEsc(preRow?.rm || rmClean || '-')}" readonly id="p-rm-display">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra selecionada</label>
                            <input type="text" class="modal-input font-mono" value="${mproEsc(preRow?.digital_obra || obraClean || '-')}" readonly id="p-digital-obra-display">
                        </div>
                    </div>
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data Recrutamento *</label>
                        <input type="date" id="p-recruited" class="modal-input" value="${todayInputDate()}" oninput="updateNewPersonRecruitmentDates()" onchange="updateNewPersonRecruitmentDates()" required>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Prevista</label>
                        <input type="date" id="p-aso-planned" class="modal-input auto-date-input" readonly>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Realizada</label>
                        <input type="date" id="p-aso-real" class="modal-input" title="Preencha quando o ASO for realizado">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Prevista</label>
                        <input type="date" id="p-admission-planned" class="modal-input auto-date-input" readonly>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Real</label>
                        <input type="date" id="p-admitted-real" class="modal-input" title="Ao preencher esta data, a pessoa passa a aparecer em Mobilização">
                    </div>
                </div>

                <div class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px] text-muted">
                    A baixa da solicitação não altera a quantidade solicitada original; ela reduz o saldo em aberto pelo vínculo do colaborador à RM, Obra e Função selecionadas.
                </div>
            </div>

            <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
                <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
                <button onclick="saveNewPerson()" class="btn btn-primary px-8">Salvar Colaborador</button>
            </div>
        `);

        const displaySync = () => {
            const parsed = mproParseVacancyValue(document.getElementById('p-vacancy-link')?.value || '');
            const rmDisplay = document.getElementById('p-rm-display');
            const obraDisplay = document.getElementById('p-digital-obra-display');
            if (rmDisplay) rmDisplay.value = parsed.rm || '-';
            if (obraDisplay) obraDisplay.value = parsed.digital_obra || '-';
        };
        const previousApply = window.mproApplyVacancySelection;
        window.mproApplyVacancySelection = function(value) {
            previousApply(value);
            displaySync();
        };

        if (selectedVacancyValue) mproApplyVacancySelection(selectedVacancyValue);
        else updateNewPersonRecruitmentDates();
    };

    // Mantém a correção do fluxo de cadastro e acrescenta validação da RM suspensa.
    window.saveNewPerson = saveNewPerson = function() {
        if (typeof isGerencial === 'function' && !isGerencial() && typeof canEditPage === 'function' && !canEditPage('recrutamento')) {
            return typeof accessDenied === 'function' ? accessDenied('recrutamento') : alert('Perfil sem permissão para cadastrar colaborador.');
        }

        updateNewPersonRecruitmentDates();

        const selectedVacancy = mproParseVacancyValue(document.getElementById('p-vacancy-link')?.value || '');
        if (selectedVacancy.rm && selectedVacancy.digital_obra && selectedVacancy.func) {
            const funcInput = document.getElementById('p-func');
            const rmInput = document.getElementById('p-rm');
            const obraInput = document.getElementById('p-digital-obra');
            if (funcInput) funcInput.value = selectedVacancy.func;
            if (rmInput) rmInput.value = selectedVacancy.rm;
            if (obraInput) obraInput.value = selectedVacancy.digital_obra;
        }

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

        const linkedVacancy = getVacancyRowByLink(func, rm, digitalObra);
        if (rm || digitalObra) {
            if (!linkedVacancy) return alert("A RM vinculada selecionada não foi encontrada nas solicitações em aberto.");
            if (linkedVacancy.open <= 0 && linkedVacancy.requested > 0) return alert(`Nao ha saldo disponivel para RM ${linkedVacancy.rm} / ${linkedVacancy.digital_obra} / ${linkedVacancy.func}.`);
        }

        if ((CANDIDATES || []).some(c => onlyDigits(c.cpf) === cpf)) return alert("Ja existe uma pessoa cadastrada com este CPF.");

        const trainingStartPlanned = admissionPlanned ? addBusinessDaysToInputDate(admissionPlanned, 1) : null;
        const matrix = TRAINING_MATRIX.find(f => f.function === func);
        const trainingEndPlanned = trainingStartPlanned && matrix ? addBusinessDaysToInputDate(trainingStartPlanned, Math.max(1, Math.ceil(Number(matrix.days || 1)))) : null;

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
        saveData();
        closeModal();

        if (typeof updateVacancyBadge === 'function') updateVacancyBadge();

        if (admittedReal && typeof selectPage === 'function') selectPage('mobilizacao');
        else {
            selectPage('recrutamento');
            renderCurrentPage();
        }

        setTimeout(() => {
            try {
                if (typeof updateAlertIcon === 'function') updateAlertIcon();
                if (typeof applyPermissionLock === 'function') applyPermissionLock();
            } catch(e) {}
        }, 0);

        return newCandidate;
    };

    const previousSelectPageForMenuOrder = typeof selectPage === 'function' ? selectPage : null;
    if (previousSelectPageForMenuOrder) {
        window.selectPage = selectPage = function(page) {
            const result = previousSelectPageForMenuOrder.apply(this, arguments);
            setTimeout(mproMoveSolicitacaoBeforeRecrutamento, 0);
            return result;
        };
    }

    const previousRenderCurrentPageForMenuOrder = typeof renderCurrentPage === 'function' ? renderCurrentPage : null;
    if (previousRenderCurrentPageForMenuOrder) {
        window.renderCurrentPage = renderCurrentPage = function() {
            const result = previousRenderCurrentPageForMenuOrder.apply(this, arguments);
            setTimeout(mproMoveSolicitacaoBeforeRecrutamento, 0);
            return result;
        };
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(mproMoveSolicitacaoBeforeRecrutamento, 50));
    else setTimeout(mproMoveSolicitacaoBeforeRecrutamento, 50);
})();
