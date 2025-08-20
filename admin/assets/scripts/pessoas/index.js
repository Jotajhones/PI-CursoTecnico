import atualizarTabela from "./services/atualizarTabela.js";
import getInputs from "./commons/getInputs.js";
import addPessoa from "./services/addPessoa.js";
import atualizarPessoa from "./services/atualizarPessoa.js";
import deletarPessoa from "./services/deletarPessoa.js";
import procurar from "./services/procurar.js";
import filtrarSituacao from "./services/filtrarSituacao.js";

window.addEventListener('load', atualizarTabela);

const inputs = getInputs();

inputs.adicionar.addEventListener('click', addPessoa);
inputs.atualizar.addEventListener('click', atualizarPessoa);
inputs.deletar.addEventListener('click', deletarPessoa);
inputs.searchbar.addEventListener('keypress', procurar);
inputs.rdAtivo.addEventListener('change', filtrarSituacao);
inputs.rdInativo.addEventListener('change', filtrarSituacao);