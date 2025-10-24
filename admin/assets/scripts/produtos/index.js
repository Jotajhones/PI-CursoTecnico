import atualizarTabela from "./services/atualizarTabela.js";
import adicionarProduto from "./services/addProduto.js";
import atualizarProduto from "./services/atualizarProduto.js";
import deletarProduto from "./services/deletarProduto.js";
import filtrarProds from "./services/filtrarProds.js";
import procurarProds from "./services/procurarProds.js";
import getInputs from "./utils/getInputs.js";
import setTheme from "../common/setTheme.js";

window.addEventListener('load', atualizarTabela);

const input = getInputs();
const buttonTheme = document.querySelector('.buttonTheme');

input.adicionar.addEventListener('click', adicionarProduto);
input.atualizar.addEventListener('click', atualizarProduto);
input.deletar.addEventListener('click', deletarProduto);
buttonTheme.addEventListener('click', setTheme);

input.searchbar.addEventListener('keypress', procurarProds);

input.ativo.addEventListener('change', filtrarProds);
input.esgotado.addEventListener('change', filtrarProds);
input.descontinuado.addEventListener('change', filtrarProds);
