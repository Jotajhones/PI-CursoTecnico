import getValues from "../../commons/getValues.js";
import getInputs from "../../commons/getInputs.js";
import validarInput from "../../commons/validarInput.js"
import addPessoa from "./addPessoa.js";
import addFone from "./addFone.js";
import addEndereco from "./addEndereco.js";
import modal from "../../commons/modal.js"
import modalAlt from "../../commons/modalAlt.js"

async function addUser() {

    const verificar = [];

    const valores = getValues();
    const input = getInputs();

    verificar.push(validarInput(input.nome));
    verificar.push(validarInput(input.email));
    verificar.push(validarInput(input.cpf));
    verificar.push(validarInput(input.genero));
    verificar.push(validarInput(input.telefone));
    verificar.push(validarInput(input.nascimento));
    verificar.push(validarInput(input.cep));
    verificar.push(validarInput(input.rua));
    verificar.push(validarInput(input.uf));
    verificar.push(validarInput(input.cidade));
    verificar.push(validarInput(input.bairro));
    verificar.push(validarInput(input.numeroEnd));
    verificar.push(validarInput(input.senha));
    verificar.push(validarInput(input.confirmeSenha));


    if (valores.senha !== valores.confirmeSenha) {
        modal('Erro de preenchimento', 'As senhas não conferem')
        verificar.push(false);
    }

    const verificador = verificar.filter(item => item === false);

    const dadosPessoa = {
        nome: valores.nome,
        email: valores.email,
        cpf: valores.cpf,
        genero: valores.genero,
        data_nascimento: valores.nascimento,
        senha: valores.senha,
    };


    const dadosEnderecoParcial = {
        cep: valores.cep,
        rua: valores.rua,
        cidade: valores.cidade,
        bairro: valores.bairro,
        complemento: valores.complemento,
        numero: valores.numeroEnd, 
        uf: valores.uf,
    };

    const dadosFoneParcial = {
        numero: valores.telefone,
    };

    if (verificador.length === 0) {
        let id_pessoa = null;

        try {

            const data = await addPessoa(dadosPessoa);

            id_pessoa = data.id_pessoa;

            if (id_pessoa) {

                const dadosEndereco = { ...dadosEnderecoParcial, id_pessoa };
                const dadosFone = { ...dadosFoneParcial, id_pessoa };

                await addEndereco(dadosEndereco);
                await addFone(dadosFone);

                window.location.href = './login.html';

            } else {
                modalAlt("erro", "Ocorreu um erro ao obter o ID para completar o cadastro.");
            }

        } catch (error) {
            console.error("Erro no fluxo de cadastro:", error);
            modalAlt("erro", `Ocorreu um erro no cadastro. Detalhes: ${error.message}`);
        }

    } else {
        modalAlt("erro", "Preencha corretamente os campos em vermelho!");
    }
}

export default addUser;