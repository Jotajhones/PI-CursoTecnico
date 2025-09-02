//função para pegar o elemento HTML input
function getInputs() {

    const id_produto = document.querySelector('#id_produto');
    const id_descricao = document.querySelector('#id_descricao');
    const denominacao = document.querySelector('#produto');
    const preco = document.querySelector('#preco');
    const estoque = document.querySelector('#estoque');
    const descricao = document.querySelector('#descricao');
    const url = document.querySelector('#url');
    const cor = document.querySelector('#cor');
    const tecido = document.querySelector('#tecido');
    const categoria = document.querySelector('#categoria');
    const tamanho = document.querySelector('#tamanho');
    const situacao = document.querySelector('#situacao');
    const searchbar = document.querySelector('#searchbar');
    const ativo = document.querySelector('#rdAtivo');
    const esgotado = document.querySelector('#rdEsgotado');
    const descontinuado = document.querySelector('#rdDescontinuado');
    const adicionar = document.querySelector('#adicionar');
    const atualizar = document.querySelector('#atualizar');
    const deletar = document.querySelector('#deletar');

    const input = {
        id_produto,
        id_descricao,
        denominacao,
        estoque,
        preco,
        descricao,
        url,
        cor,
        tecido,
        tamanho,
        categoria,
        situacao,
        searchbar,
        ativo,
        esgotado,
        descontinuado,
        adicionar,
        atualizar,
        deletar
    }

    return input;
}

export default getInputs;
