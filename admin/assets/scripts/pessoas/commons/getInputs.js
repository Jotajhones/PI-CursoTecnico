function getInputs() {

    const id_pessoa = document.querySelector('#id_pessoa');
    const id_usuario = document.querySelector('#id_usuario');
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const cpf = document.querySelector('#cpf');
    const genero = document.querySelector('#genero');
    const nascimento = document.querySelector('#nascimento');
    const desconto = document.querySelector('#desconto');
    const fidelidade = document.querySelector('#fidelidade');
    const situacao = document.querySelector('#situacao');
    const searchbar = document.querySelector('#searchbar');
    const rdAtivo = document.querySelector('#rdAtivo');
    const rdInativo = document.querySelector('#rdInativo');
    const adicionar = document.querySelector('#adicionar');
    const atualizar = document.querySelector('#atualizar');
    const deletar = document.querySelector('#deletar');

    const input = {
        id_pessoa,
        id_usuario,
        nome,
        email,
        cpf,
        genero,
        nascimento,
        desconto,
        fidelidade,
        situacao,
        searchbar,
        rdAtivo,
        rdInativo,
        adicionar,
        atualizar,
        deletar
    }

    return input;
}

export default getInputs;