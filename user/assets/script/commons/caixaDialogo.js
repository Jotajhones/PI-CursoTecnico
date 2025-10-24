let caixaDialogoCriado = false;
let overlayCriado = false;

function criarOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'caixa-dialogo-overlay';
    overlay.className = 'caixa-dialogo-overlay';
    document.body.appendChild(overlay);
    overlayCriado = true;
    return overlay;
}

function caixaDialogo(mensagem) {
    return new Promise((resolve) => {
        let modal;
        let btnSim;
        let btnNao;
        let overlay;

        if (!overlayCriado) {
            overlay = criarOverlay();
        } else {
            overlay = document.getElementById('caixa-dialogo-overlay');
        }

        if (!caixaDialogoCriado) {
            modal = document.createElement('div');
            modal.id = 'caixa-dialogo-confirm';
            modal.className = 'caixa-dialogo confirm';

            const mensagemElemento = document.createElement('p');
            mensagemElemento.className = 'caixa-dialogo-mensagem';

            const botoesContainer = document.createElement('div');
            botoesContainer.className = 'caixa-dialogo-botoes';

            btnSim = document.createElement('button');
            btnSim.textContent = 'Sim';
            btnSim.className = 'caixa-dialogo-btn sim';
            botoesContainer.appendChild(btnSim);

            btnNao = document.createElement('button');
            btnNao.textContent = 'Não';
            btnNao.className = 'caixa-dialogo-btn nao';
            botoesContainer.appendChild(btnNao);

            modal.appendChild(mensagemElemento);
            modal.appendChild(botoesContainer);
            document.body.appendChild(modal);

            caixaDialogoCriado = true;
        } else {
            modal = document.getElementById('caixa-dialogo-confirm');
            btnSim = modal.querySelector('.caixa-dialogo-btn.sim');
            btnNao = modal.querySelector('.caixa-dialogo-btn.nao');
        }

        const mensagemElemento = modal.querySelector('.caixa-dialogo-mensagem');
        mensagemElemento.textContent = mensagem;

        const removerListeners = (result) => {
            modal.classList.remove('ativo');
            overlay.classList.remove('ativo');
            document.body.classList.remove('no-scroll');
            resolve(result);
        };

        const novoBtnSim = btnSim.cloneNode(true);
        btnSim.parentNode.replaceChild(novoBtnSim, btnSim);

        const novoBtnNao = btnNao.cloneNode(true);
        btnNao.parentNode.replaceChild(novoBtnNao, btnNao);

        novoBtnSim.addEventListener('click', () => removerListeners(true), { once: true });
        novoBtnNao.addEventListener('click', () => removerListeners(false), { once: true });

        document.body.classList.add('no-scroll');
        overlay.classList.add('ativo');
        modal.classList.add('ativo');
    });
}

export default caixaDialogo;