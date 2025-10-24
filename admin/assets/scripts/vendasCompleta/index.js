import carregarPageVendasCompletas from "./service/carrregarPageVendasCompletas.js";
import setItensByVenda from "./utils/setItensByVenda.js";
import voltarVendas from "./utils/voltarVendas.js";
import setTheme from "../common/setTheme.js";

window.addEventListener('load', carregarPageVendasCompletas);

const buttonTheme = document.querySelector('.buttonTheme');

const voltarBtn = document.getElementById('btnVoltar');
const btnAlterar = document.getElementById('btnAlterar');

buttonTheme.addEventListener('click', setTheme);
voltarBtn.addEventListener('click', voltarVendas);
btnAlterar.addEventListener('click', setItensByVenda);
