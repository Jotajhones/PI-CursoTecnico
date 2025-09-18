
function preLoadTheme() {

    let theme;

    if (localStorage.getItem('theme')) {

        theme = localStorage.getItem('theme');

    } else {
        theme = "claro"
    }

    if (JSON.parse(theme) === 'escuro') {

        document.documentElement.style.setProperty('--fundo', '#202020');
        document.documentElement.style.setProperty('--fundo2', '#4D4D4D');
        document.documentElement.style.setProperty('--fundo3', '#4D4D4D');

        document.documentElement.style.setProperty('--cor1', '#4D4D4D');
        document.documentElement.style.setProperty('--cor2', '#4D4D4D');
        document.documentElement.style.setProperty('--cor3', '#4D4D4D');
        document.documentElement.style.setProperty('--cor4', '#202020');
        document.documentElement.style.setProperty('--cor5', '#202020');


        document.documentElement.style.setProperty('--corFonte', '#FFFFFF');
        document.documentElement.style.setProperty('--corFonte1', '#ffffffd2)');
        document.documentElement.style.setProperty('--corFonte2', '#FFFFFFd2');

        document.documentElement.style.setProperty('--cardDescricao', '#696666ff');
        document.documentElement.style.setProperty('--borderInput', '#b4cee6de');

        document.documentElement.style.setProperty('--SombraMenu', '#2020209f');

    } else if (JSON.parse(theme) === 'claro') {

        document.documentElement.style.setProperty('--fundo', '#CCCCCC');
        document.documentElement.style.setProperty('--fundo2', '#F8FAFD');
        document.documentElement.style.setProperty('--fundo3', '#C5A4A5');

        document.documentElement.style.setProperty('--cor1', '#0D0D0D');
        document.documentElement.style.setProperty('--cor2', '#101726');
        document.documentElement.style.setProperty('--cor3', '#1E2940');
        document.documentElement.style.setProperty('--cor4', '#a1a1a1');
        document.documentElement.style.setProperty('--cor5', '#F8FAFD');


        document.documentElement.style.setProperty('--corFonte', '#1E2940');
        document.documentElement.style.setProperty('--corFonte1', '#0D0D0D)');
        document.documentElement.style.setProperty('--corFonte2', '#FFFFFF');

        document.documentElement.style.setProperty('--cardDescricao', '#b4cee6de');
        document.documentElement.style.setProperty('--borderInput', '#101726');

        document.documentElement.style.setProperty('--SombraMenu', '#1E2940');

    }
}
