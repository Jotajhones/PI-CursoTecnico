import darkTheme from "./darkTheme.js";
import saveTheme from "./saveTheme.js";
import classicTheme from "./classicTheme.js";

function setTheme() {

    const buttonTheme = document.querySelector('.buttonTheme');

    if (buttonTheme.dataset.theme === 'claro') {

        darkTheme();

        buttonTheme.dataset.theme = 'escuro';
        saveTheme(buttonTheme.dataset.theme);

    } else if (buttonTheme.dataset.theme === 'escuro') {

        classicTheme();

        buttonTheme.dataset.theme = 'claro';
        saveTheme(buttonTheme.dataset.theme);
    }
}
export default setTheme;
