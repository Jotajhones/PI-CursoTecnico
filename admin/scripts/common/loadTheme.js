import getTheme from "./getTheme.js"

function loadTheme() {
    let theme = getTheme();
    const buttonTheme = document.querySelector('.buttonTheme');

    if (JSON.parse(theme) === 'escuro') {

        buttonTheme.dataset.theme = 'escuro';

    } else if (JSON.parse(theme) === 'claro') {

        buttonTheme.dataset.theme = 'claro';

    }
}

export default loadTheme;