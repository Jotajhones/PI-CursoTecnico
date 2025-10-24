import modal from '../../commons/modal.js';
import modalAlt from '../../commons/modalAlt.js';
import setUserData from '../services/setUserData.js';
import validarInputs from "../../commons/validarInput.js";
import getInputs from "../utils/getInputs.js";
import setUserEnd from '../services/setUserEnd.js';
import setUserTel from '../services/setUserTel.js';

async function setUser(id_pessoa, id_usuario) {


    const verificar = [];

    const input = getInputs();

    verificar.push(validarInputs(input.nome));
    verificar.push(validarInputs(input.email));
    verificar.push(validarInputs(input.cpf));
    verificar.push(validarInputs(input.genero));
    verificar.push(validarInputs(input.telefone));
    verificar.push(validarInputs(input.nascimento));
    verificar.push(validarInputs(input.cep));
    verificar.push(validarInputs(input.rua));
    verificar.push(validarInputs(input.uf));
    verificar.push(validarInputs(input.cidade));
    verificar.push(validarInputs(input.bairro));
    verificar.push(validarInputs(input.numeroEnd));

    const verificador = verificar.filter(item => item === false);

    if (verificador.length === 0) {

        const dadosPessoa = {
            id_pessoa: id_pessoa,
            id_usuario: id_usuario,
            nome: input.nome.value,
            email: input.email.value,
            cpf: input.cpf.value,
            genero: input.genero.value,
            data_nascimento: input.nascimento.value,
            desconto: 0,
            fidelidade: 0,
            situacao: 'ativo',
        };

        const resEnd = await fetch(`http://localhost:8080/blusablusas/endereco/id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id_pessoa": id_pessoa })
        });

        const enderecoData = await resEnd.json();
        const id_endereco = enderecoData[0].id_endereco;

        const dadosEndereco = {
            id_pessoa: id_pessoa,
            id_endereco: id_endereco,
            cep: input.cep.value,
            rua: input.rua.value,
            cidade: input.cidade.value,
            bairro: input.bairro.value,
            complemento: input.complemento.value,
            numero: input.numeroEnd.value,
            uf: input.uf.value,
        }

        const resTel =  await fetch(`http://localhost:8080/blusablusas/fone/id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id_pessoa": id_pessoa })
        }); 
        const telefoneData = await resTel.json();
        const id_telefone = telefoneData[0].id_telefone;
        console.log(id_telefone);

        const dadosFone = {
            id_telefone: id_telefone,
            numero: input.telefone.value,
            tipo: 'celular'
        }


        try {

            const resData = await setUserData(dadosPessoa);
            const resEnd = await setUserEnd(dadosEndereco);
            const resTel = await setUserTel(dadosFone);

            if (resData && resEnd && resTel) {

                modal('Sucesso', 'Seus dados foram atualizados com sucesso!');

            } else {
                modal('Erro', 'Não foi possível atualizar seus dados. Tente novamente mais tarde.');
                throw new Error('Falha ao atualizar os dados do usuário.');
            }

        } catch (error) {
            console.error('Erro ao definir o usuário:', error);
        }

    } else {
        modalAlt('erro', 'Por favor, verifique os campos destacados em vermelho.');
        return;
    }

}

export default setUser;