import atualizarProdutos from "../commons/atualizarProdutos.js";
import cardDestaque from "../commons/cardDestaque.js";
import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import goToCart from "../commons/goToCart.js"

window.addEventListener('load', async () => {

    const url = 'http://localhost:8080/blusablusas/produtos/destaques';
    const container = document.querySelector('#main');

    atualizarProdutos(url, cardDestaque, container);

    verificarLoginAtivo();

    const id_venda = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    carrinhoDeCompras(id_venda.ultima_venda);

    if (user) {
    const id_usuario = user.id_usuario;
    const id_venda = user.ultima_venda;

    carrinhos.forEach(item => {
        item.addEventListener('click', () => {
            // alert() // Removido: Alerta desnecessário
            window.location.href = `./assets/pages/carrinho.html?id_venda=${id_venda}&id_usuario=${id_usuario}`;
        });
    });

    const userName = document.querySelectorAll('.cabecalhoLoginNome');

    userName.forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `./assets/pages/perfil.html?id_usuario=${user.id_usuario}`;
        });
    });
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




