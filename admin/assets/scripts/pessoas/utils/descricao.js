// Função para ancorar o click a pagina descrição, carregando dinamicamente o conteudo conforme os paramentros passados no click;

function descricao(id_pessoa, id_usuario) {
    window.location.href = `./descricao.html?id_pessoa=${id_pessoa}&id_usuario=${id_usuario}`;
};


export default descricao;