// função para digitar menos "document.querySelector(#id_de_alguem).value ?? null"
function getInputValue(id) {
    return document.querySelector(`#${id}`)?.value ?? null;
}

//função para recuperar os valores dos inputs
function getValues() {
    const id_produto = getInputValue('id_produto');
    const id_descricao = getInputValue('id_descricao');
    const denominacao = getInputValue('produto');
    const preco = getInputValue('preco');
    const estoque = getInputValue('estoque');
    const descricao = getInputValue('descricao');
    const url = getInputValue('url');
    const cor = getInputValue('cor');
    const tecido = getInputValue('tecido');
    const categoria = getInputValue('categoria');
    const tamanho = getInputValue('tamanho');
    const situacao = getInputValue('situacao');
    const ativo = getInputValue('ativo');
    const esgotado = getInputValue('esgotado');
    const descontinuado = getInputValue('descontinuado');
    const searchbar = getInputValue('searchbar');

    const produto = {
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
        ativo,
        esgotado,
        descontinuado,
        searchbar
    };
    return produto;
}

export default getValues;