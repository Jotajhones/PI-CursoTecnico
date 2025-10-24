import atualizarTabela from "./services/atualizarTabela.js";
import getInputs from "./commons/getInputs.js";
import addPessoa from "./services/addPessoa.js";
import atualizarPessoa from "./services/atualizarPessoa.js";
import deletarPessoa from "./services/deletarPessoa.js";
import procurarUser from "./services/procurarUser.js";
import filtrarUser from "./services/filtrarUser.js";
import cpf from "./commons/cpf.js";
import setTheme from "../common/setTheme.js";

window.addEventListener('load', atualizarTabela);

const inputs = getInputs();
const buttonTheme = document.querySelector('.buttonTheme');

inputs.adicionar.addEventListener('click', addPessoa);
inputs.atualizar.addEventListener('click', atualizarPessoa);
inputs.deletar.addEventListener('click', deletarPessoa);
buttonTheme.addEventListener('click', setTheme); 

inputs.searchbar.addEventListener('keypress', procurarUser);
inputs.cpf.addEventListener('keypress', cpf); 

inputs.rdAtivo.addEventListener('change', filtrarUser);
inputs.rdInativo.addEventListener('change', filtrarUser);
