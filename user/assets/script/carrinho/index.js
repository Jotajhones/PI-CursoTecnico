import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import carregarCartPage from "./services/carregarCartPage.js";
import setItensCarrinho from "./services/setItensCarrinho.js";
import cancelarCompra from "./services/cancelarCompra.js";
import confirmarCompra from "./services/confirmarCompra.js";


window.addEventListener('load', async () => {

    verificarLoginAtivo();

    const id_venda = JSON.parse(window.localStorage.getItem('BlusasBlusasUser'));

    await carrinhoDeCompras(id_venda.ultima_venda);

    if (id_venda) {
        carregarCartPage();

        const userName = document.querySelectorAll('.cabecalhoLoginNome');

        userName.forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = `./perfil.html?id_usuario=${user.id_usuario}`;
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

document.querySelector('#btnAlterar').addEventListener('click', () => {
    setItensCarrinho();
});

document.querySelector('#btnCancelar').addEventListener('click', () => {
    cancelarCompra();
});

document.querySelector('#btnHistorico').addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id_usuario = urlParams.get('id_usuario')
    window.location.href = `./historico.html?id_usuario=${id_usuario}`;
});

document.querySelector('#btnComprar').addEventListener('click', () => {
    confirmarCompra();
});