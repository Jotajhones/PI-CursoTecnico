import atualizarProdutos from "../commons/atualizarProdutos.js";
import cardComum from "../commons/cardComum.js";
import filterProdutos from "../commons/filterProdutos.js";
import initializeFilterMenu from "../commons/initializeFilterMenu.js";
import searchProdutos from "../commons/searchProdutos.js";
import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import goToCart from "../commons/goToCart.js"

const categoria = "series";

document.addEventListener('DOMContentLoaded', initializeFilterMenu);

window.addEventListener('load', async () => {

    const url = `http://localhost:8080/blusablusas/produtos/categoria/${categoria}`;
    const container = document.querySelector('.containerProdutos');

    atualizarProdutos(url, cardComum, container);
    verificarLoginAtivo();

    const id_venda = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));
    carrinhoDeCompras(id_venda.ultima_venda);
});


document.querySelector('#buttonFiltros').addEventListener('click', () => {
    searchProdutos(categoria);
})

document.querySelector('.searchContainer').addEventListener('submit', (e) => {
    e.preventDefault();
    searchProdutos(categoria);
})

document.querySelector('#botaoFiltrar').addEventListener('click', () => {
    filterProdutos(categoria);
})

const rangePreco = document.querySelector("#rangePreco");
const rangeValue = document.querySelector("#rangeValue");

rangePreco.addEventListener('input', () => {
    const formatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(rangePreco.value));
    rangeValue.innerHTML = `${formatado}`;
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

    const userName = document.querySelectorAll('.cabecalhoLoginNome');

    userName.forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `./perfil.html?id_usuario=${user.id_usuario}`;
        });
    });
}
