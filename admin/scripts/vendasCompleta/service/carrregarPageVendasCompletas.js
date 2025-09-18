import loadTheme from "../../common/loadTheme.js";
import carregarItens from "./carreagarItens.js";
import carregarHeaderVendasCompleta from "./carregarHeaderVendasCompleta.js";

// Função que irá caregar os componentes que contem conteudo dinamico da pagina;
function carregarPageVendasCompletas() { 

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    carregarHeaderVendasCompleta(id_venda);
    carregarItens(id_venda);
    loadTheme();
}

export default carregarPageVendasCompletas;