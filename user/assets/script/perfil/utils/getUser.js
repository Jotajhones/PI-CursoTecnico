import getInputs from "./getInputs.js";
import getUserData from "../services/getUserData.js";
import getUserEnd from "../services/getUserEnd.js";
import getUserTel from "../services/getUserTel.js";

async function getUser(id_pessoa, id_usuario) {

    try {

        const userData = await getUserData(id_pessoa, id_usuario);
        const userEnd = await getUserEnd(id_pessoa);
        const userTel = await getUserTel(id_pessoa);

        const nascimento = new Date(userData[0].data_nascimento).toISOString().split('T')[0];

        if (userData && userEnd && userTel) {

            const inputs = getInputs();

            inputs.id_pessoa.value = userData[0].id_pessoa;
            inputs.id_usuario.value = userData[0].id_usuario;
            inputs.nome.value = userData[0].nome;
            inputs.email.value = userData[0].email;
            inputs.cpf.value = userData[0].cpf;
            inputs.genero.value = userData[0].genero;
            inputs.telefone.value = userTel[0].numero;
            inputs.nascimento.value = nascimento;
            inputs.cep.value = userEnd[0].cep;
            inputs.rua.value = userEnd[0].rua;
            inputs.uf.value = userEnd[0].uf;
            inputs.cidade.value = userEnd[0].cidade;
            inputs.bairro.value = userEnd[0].bairro;
            inputs.complemento.value = userEnd[0].complemento;
            inputs.numeroEnd.value = userEnd[0].numero;
        }

    } catch (error) {
        console.error('Erro ao obter o usuário:', error);
    }

}

export default getUser;