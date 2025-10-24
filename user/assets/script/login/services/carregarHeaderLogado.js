
function carregarHeaderLogado(user) {

    const loginTXTlogin = document.querySelectorAll('.cabecalhoLoginNome');
    const nome = (user.nome).split(' ').slice(0, 2).join(' ');

    loginTXTlogin.forEach(element => {
        element.innerHTML = `Olá ${nome}!`;
    });

    const loginIMG = document.querySelectorAll('.loginIMG');
    loginIMG.forEach(element => {
        element.classList.remove('iconShow');
        element.classList.add('iconHide');
    });

    const logoutIMG = document.querySelectorAll('.logoutIMG');
    logoutIMG.forEach(element => {
        element.classList.remove('iconHide');
        element.classList.add('iconShow');
    });

    const carrinho = document.querySelectorAll('.carrinhoDeCompraIcon');
    carrinho.forEach(element => {
        element.classList.remove('iconHide');
        element.classList.add('iconShow');
    });
}

export default carregarHeaderLogado;