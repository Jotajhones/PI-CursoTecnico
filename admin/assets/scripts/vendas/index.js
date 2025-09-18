import atualizarTabela from "./services/atualizarTabela.js";
import procurarVenda from "./services/procurarVenda.js";
import filtrarVendas from "./services/filtrarVendas.js";
import setTheme from "../common/setTheme.js";

window.addEventListener('load', atualizarTabela);

const buttonTheme = document.querySelector('.buttonTheme');

buttonTheme.addEventListener('click', setTheme);

document.querySelector('#searchbar').addEventListener('keypress', procurarVenda);

document.querySelector("#rdConfirmada").addEventListener('change', filtrarVendas);
document.querySelector("#rdAndamento").addEventListener('change', filtrarVendas);
document.querySelector("#rdCancelada").addEventListener('change', filtrarVendas);

document.querySelector("#rdAndamento");
document.querySelector("#rdCancelada");
