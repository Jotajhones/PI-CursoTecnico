// Função para pegar e retornar elementos HTML input (e select) da página
function getInputs() {

    const id_pessoa = document.querySelector('#id_pessoa');
    const id_usuario = document.querySelector('#id_usuario');
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const cpf = document.querySelector('#cpf');
    const genero = document.querySelector('#genero'); 
    const telefone = document.querySelector('#telefone');
    const nascimento = document.querySelector('#nascimento');
    const cep = document.querySelector('#cep');
    const rua = document.querySelector('#rua');
    const uf = document.querySelector('#uf'); 
    const cidade = document.querySelector('#cidade');
    const bairro = document.querySelector('#bairro');
    const complemento = document.querySelector('#complemento');
    const numeroEnd = document.querySelector('#numeroEnd');
    const senha = document.querySelector('#senha');


    const input = {
        id_pessoa,
        id_usuario,
        nome,
        email,
        cpf,
        genero,
        telefone,
        nascimento,
        cep,
        rua,
        uf,
        cidade,
        bairro,
        complemento,
        numeroEnd,
        senha
    }

    return input;
}

export default getInputs;