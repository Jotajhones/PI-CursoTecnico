// Função que cria um caixa de dialogo, para informar algo ao usuario, para mais informações procurar o arquivo modal.css. Feita para ser chamada em outra funções;

function modal(titulo, string) {

    // criando o fundo escuro

    let fundo = document.createElement('div');
    fundo.id = 'fundoModal';
    fundo.classList.add('fundo')
    let modal = document.createElement('div');
    modal.id = 'modal';

    // criando header da caixa de dialogo

    let cabecalho = document.createElement('div');
    cabecalho.id = 'modalHeader';

    // criando titulo da caixa de dialogo

    let h1 = document.createElement('h1');
    h1.innerHTML = titulo;

    // criando paragrafo da caixa de dialogo

    let p = document.createElement('p');
    p.innerHTML = string;

    // criando botão de fechar da caixa de dialogo

    let fechar = document.createElement('div');
    fechar.id = 'botaoModal';
    fechar.innerHTML = 'OK';

    // rolando a tela para o inicio da pagina

    window.scrollTo({
        top: 0,
    })

    // travando a tela, para que so seja destravando quando o usuario apos o usuario ler a mensagem

    document.querySelector('body').style.overflow = 'hidden';

    // add todos os elementos criados ao html

    cabecalho.appendChild(h1);
    modal.appendChild(cabecalho);
    modal.appendChild(p);
    modal.appendChild(fechar);
    fundo.appendChild(modal);

    document.querySelector('body').appendChild(fundo);

    // configurando botao de fecar

    fechar.addEventListener('click', () => {
        document.querySelector('body').style.overflow = 'auto';
        fundo.remove();
    });

    // permitindo que o modal seja fechado com a tecla enter

    document.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            document.querySelector('body').style.overflow = 'auto';
            fundo.remove();
        }
    });
}

// funação para validar especificamente os inputs de login

function validateLogin() {
    const inputEmail = document.querySelector('#inputLoginEmail');
    const inputPassword = document.querySelector('#inputLoginPassword');
    
    if (inputPassword.value === "") {
        modal('Erro  - 004', 'Por favor, preencha o campo senha.');
    }

    if (inputEmail.value === "") {
        modal('Erro  - 003', 'Por favor, preencha o campo email.');
    }

    if (inputEmail.value && inputPassword.value) {
        modal('Bem vindo!', 'Login, realizado com sucesso.');
        inputEmail.value = "";
        inputPassword.value = "";
    }
}

// ouvinte botao "Entrar" (#LoginButton) login

(function loginClick() {
    const button = document.querySelector(`#LoginButton`);

    button.addEventListener('click', () => {
        validateLogin();
    })
})();