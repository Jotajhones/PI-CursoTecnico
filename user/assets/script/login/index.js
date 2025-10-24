import logIn from "./services/logins.js";
import verificarLoginAtivo from "./services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import goToCart from "../commons/goToCart.js"

document.querySelector('#LoginButton').addEventListener('click', logIn);

window.document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        logIn();
    }
});


window.addEventListener('load', async () => {
    verificarLoginAtivo()

    const id_venda = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    carrinhoDeCompras(id_venda.ultima_venda);
});

const logoutIMGButton = document.querySelectorAll('.logoutIMG');

logoutIMGButton.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
        window.location.href = '../../index.html';
    })
});

const carrinhos = document.querySelectorAll('.carrinhoDeCompraIcon');

const user = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));


if (user) {
    carrinhos.forEach(item => {
        item.addEventListener('click', () => {
            goToCart(user.ultima_venda, user.id_usuario)
        });
    });
}
