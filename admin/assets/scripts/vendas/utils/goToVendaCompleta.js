
// Função para ancorar clique a pagina de descrição da Venda, carregada dinamicamente com base nos paramentros passados pelo clique;
function goToVendaCompleta(id_venda, id_usuario) {
    window.location.href = `./vendaCompleta.html?id_venda=${id_venda}&id_usuario=${id_usuario}`;
};


export default goToVendaCompleta;