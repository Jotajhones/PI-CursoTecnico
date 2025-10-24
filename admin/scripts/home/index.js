import setTheme from "../common/setTheme.js";
import loadTheme from "../common/loadTheme.js";

window.addEventListener('load', loadTheme);

const buttonTheme = document.querySelector('.buttonTheme');

buttonTheme.addEventListener('click', setTheme);
