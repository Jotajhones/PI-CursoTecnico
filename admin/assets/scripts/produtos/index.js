import atualizarTabela from "./services/atualizarTabela.js";
import adicionarProduto from "./services/addProduto.js";
import atualizarProduto from "./services/atualizarProduto.js";
import deletarProduto from "./services/deletarProduto.js";
import filtrarSituacao from "./services/filtro.js";
import procurar from "./services/procurar.js";
import getInputs from "./utils/getInputs.js";

const input = getInputs();

window.addEventListener('load', atualizarTabela);

input.adicionar.addEventListener('click', adicionarProduto);
input.atualizar.addEventListener('click', atualizarProduto);
input.deletar.addEventListener('click', deletarProduto);

input.searchbar.addEventListener('keypress', procurar);

input.ativo.addEventListener('change', filtrarSituacao);
input.esgotado.addEventListener('change', filtrarSituacao);
input.descontinuado.addEventListener('change', filtrarSituacao);
