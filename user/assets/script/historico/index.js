import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import atualizarHistoricoCompras from "./services/atualizarHistoricoCompras.js";
import goToCart from "../commons/goToCart.js";

window.addEventListener('load', async () => {

    verificarLoginAtivo();

    const user = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    await carrinhoDeCompras(user.ultima_venda);


    const urlParams = new URLSearchParams(window.location.search);
    const id_usuario = urlParams.get('id_usuario')

    if (user.id_usuario == id_usuario) {
        atualizarHistoricoCompras(id_usuario);
    } else {
        logout();
        window.location.href = "../../index.html"
    }
});

const logoutIMGButton = document.querySelectorAll('.logoutIMG');

logoutIMGButton.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
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

    const userName = document.querySelectorAll('.cabecalhoLoginNome');

    userName.forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `./perfil.html?id_usuario=${user.id_usuario}`;
        });
    });
}

setTimeout(() => {
    verificarLoginAtivo();

    const user = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    carrinhoDeCompras(user.ultima_venda);
}, 5000);
