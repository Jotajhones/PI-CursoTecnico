// Função que cria um caixa de dialogo, para informar algo ao usuario, para mais informações procurar o arquivo modal.css. Feita para ser chamada em outra funções;
function modal(titulo, string) {

    let fundo = document.createElement('div');
    fundo.id = 'fundoModal';
    fundo.classList.add('fundo')
    let modal = document.createElement('div');
    modal.id = 'modal';

    let cabecalho = document.createElement('div');
    cabecalho.id = 'modalHeader';

    let h1 = document.createElement('h1');
    h1.innerHTML = titulo;

    let p = document.createElement('p');
    p.innerHTML = string;

    let fechar = document.createElement('div');
    fechar.id = 'botaoModal';
    fechar.innerHTML = 'OK';

    window.scrollTo({
        top: 0,
    });

    document.querySelector('body').style.overflow = 'hidden';

    if (titulo.toLowerCase().includes("erro")) {
        cabecalho.style.background = "var(--erro)";
        fechar.style.background = "var(--erro)";
    }
    if (titulo.toLowerCase().includes("sucesso")) {
        cabecalho.style.background = "var(--buttonHover)";
        fechar.style.background = "var(--buttonHover)";
    }

    cabecalho.appendChild(h1);
    modal.appendChild(cabecalho);
    modal.appendChild(p);
    modal.appendChild(fechar);
    fundo.appendChild(modal);

    document.querySelector('body').appendChild(fundo);

    let k = document.getElementsByClassName('fundo').length

    fechar.addEventListener('click', () => {
        document.querySelector('body').style.overflow = 'auto';
        fundo.remove();
    });
}

export default modal;