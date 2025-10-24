import carregarCartHeader from "./carregarCartHeader.js";
import carregarCartItens from "./carregarCartItens.js";

function carregarCartPage() { 

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');

    carregarCartHeader(id_venda);
    carregarCartItens(id_venda);

}

export default carregarCartPage;