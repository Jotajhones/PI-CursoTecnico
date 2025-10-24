import recuperarSenha from "./services/recuperarSenha.js";

window.addEventListener('load', function () {
    const menuSuperior = document.getElementById('menuSuperior');
    menuSuperior.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#btnRecuperar').addEventListener('click', async () => {
    recuperarSenha();
});