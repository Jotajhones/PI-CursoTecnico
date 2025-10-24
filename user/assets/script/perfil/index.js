
import verificarLoginAtivo from "../login/services/verificarLoginAtivo.js";
import logout from "../login/services/logout.js";
import carrinhoDeCompras from "../commons/carrinhoDeCompras.js";
import goToCart from "../commons/goToCart.js"
import getUser from "./utils/getUser.js";
import setUser from "./utils/setUser.js";


const user = JSON.parse(localStorage.getItem('BlusasBlusasUser'));

window.addEventListener('load', async () => {

    const menuSuperior = document.getElementById('menuSuperior');
    menuSuperior.scrollIntoView({ behavior: 'smooth' });

    if (user) {

        getUser(user.id_pessoa, user.id_usuario);

        verificarLoginAtivo();

        carrinhoDeCompras(user.ultima_venda);

        const userName = document.querySelectorAll('.cabecalhoLoginNome');

        userName.forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = `./perfil.html?id_usuario=${user.id_usuario}`;
            });
        });

    } else {
        window.location.href = '../../index.html';
    }

});

const carrinhos = document.querySelectorAll('.carrinhoDeCompraIcon');

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


const logoutIMGButton = document.querySelectorAll('.logoutIMG');

logoutIMGButton.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
        window.location.href = '../../index.html';
    })
});

document.querySelector('#btnAtualizar').addEventListener('click', async () => {

    await setUser(user.id_pessoa, user.id_usuario);
});

document.querySelector('#btnSenha').addEventListener('click', () => {

    window.location.href = `alterarSenha.html?id_usuario=${user.id_usuario}`;
});


