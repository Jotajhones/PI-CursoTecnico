
// FUnção para pegar e retornar valores dos inputs;
function getValues() {

    const id_pessoa = document.querySelector('#id_pessoa').value ?? null;
    const id_usuario = document.querySelector('#id_usuario').value ?? null;
    const nome = document.querySelector('#nome').value ?? null;
    const email = document.querySelector('#email').value ?? null;
    const cpf = document.querySelector('#cpf').value ?? null;
    const genero = document.querySelector('#genero').value ?? null;
    const nascimento = document.querySelector('#nascimento').value ?? null;
    const desconto = document.querySelector('#desconto').value ?? null;
    const fidelidade = document.querySelector('#fidelidade').value ?? null;
    const situacao = document.querySelector('#situacao').value ?? null;
    const searchbar = document.querySelector('#searchbar').value ?? null;
    const rdAtivo = document.querySelector('#rdAtivo').value ?? null;
    const rdInativo = document.querySelector('#rdInativo').value ?? null;

    const pessoa = {
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
        rdInativo
    }
    return pessoa;
}

export default getValues;