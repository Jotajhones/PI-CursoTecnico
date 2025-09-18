import carregarPage from "./commons/utils/carregarPage.js";
import setTheme from "../common/setTheme.js";

window.addEventListener('load', carregarPage);

const buttonTheme = document.querySelector('.buttonTheme');

buttonTheme.addEventListener('click', setTheme);
