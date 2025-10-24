import getInputs from "./getInputs.js";

function getValues() {
    const inputs = getInputs();

    return {
        id_pessoa: inputs.id_pessoa.value,
        id_usuario: inputs.id_usuario.value,
        nome: inputs.nome.value,
        email: inputs.email.value,
        cpf: inputs.cpf.value,
        genero: inputs.genero.value,
        telefone: inputs.telefone.value,
        nascimento: inputs.nascimento.value,
        cep: inputs.cep.value,
        rua: inputs.rua.value,
        uf: inputs.uf.value,
        cidade: inputs.cidade.value,
        bairro: inputs.bairro.value,
        complemento: inputs.complemento.value,
        numeroEnd: inputs.numeroEnd.value,
        senha: inputs.senha.value,
        confirmeSenha: inputs.confirmeSenha.value
    };
}

export default getValues;