let modalCriado = false;

function modalAlt(tipo, mensagem) {
    let modal;

    if (!modalCriado) {
        modal = document.createElement('div');
        modal.id = 'modal-alt';
        modal.className = 'modal-alt';

        const mensagemElemento = document.createElement('p');
        mensagemElemento.className = 'modal-alt-mensagem';

        modal.appendChild(mensagemElemento);
        document.body.appendChild(modal);

        modalCriado = true;
    } else {
        modal = document.getElementById('modal-alt');
    }

    const mensagemElemento = modal.querySelector('.modal-alt-mensagem');

    modal.className = 'modal-alt';
    mensagemElemento.textContent = mensagem;

    if (tipo === 'sucesso') {
        modal.classList.add('sucesso');
    } else if (tipo === 'erro') {
        modal.classList.add('erro');
    }

    modal.classList.add('ativo');

    setTimeout(() => {
        modal.classList.remove('ativo');
    }, 4000);
}

export default modalAlt;