function initializeFilterMenu() {

    const botaoAbrir = document.getElementById('botaoAbrirFiltros');
    const botaoFechar = document.getElementById('botaoFecharFiltros');
    const menuFiltro = document.querySelector('.filtro');

    botaoAbrir.addEventListener('click', () => {
        menuFiltro.classList.add('ativo');
    });

    botaoFechar.addEventListener('click', () => {
        menuFiltro.classList.remove('ativo');
    });
}

export default initializeFilterMenu;