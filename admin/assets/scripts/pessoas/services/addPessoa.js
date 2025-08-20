import getValues from "../commons/getValues.js";
import getInputs from "../commons/getInputs.js";
import validarInput from "../../common/validarInputs.js";
import atualizarTabela from "./atualizarTabela.js";
import limparForm from "../commons/limparForm.js";
import modal from "../../common/modal.js";
import setOldValues from "../commons/setOldValues.js";

//Função para adicionar novo usuario; 
function addPessoa() {

    const verificar = [];

    const valores = getValues();
    const input = getInputs();

    verificar.push(validarInput(input.nome));
    verificar.push(validarInput(input.email));
    verificar.push(validarInput(input.cpf));
    verificar.push(validarInput(input.genero));
    verificar.push(validarInput(input.nascimento));
    // verificar.push(validarInput(input.desconto));
    // verificar.push(validarInput(input.fidelidade));
    // verificar.push(validarInput(input.situacao));

    const verificador = verificar.filter(item => item === false);

    try {
        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "nome": valores.nome,
                    "email": valores.email,
                    "cpf": valores.cpf,
                    "genero": valores.genero,
                    "dataNascimento": valores.nascimento
                })
            })
                .then(res => {
                    if (res.ok) {

                        atualizarTabela();
                        limparForm();
                        modal("Sucesso", "Usuario adicionado com sucesso!");

                    } else if (res.status === 500) {

                        modal("ERRO no 00000 - " + res.status, "o servidor não respondeu sua solicitação!");

                    } else if (!res.ok) {

                        modal("ERROR na requisição", "Outros erros de requisição. \nRetorno: " + res.statusText);
                    }
                    return res.json();
                })
                .catch(err => { console.error(err) });

        } else {
            modal("ERRO DE PREENCHIMENTO", "Preencha corretamente os campos em vermelho!");
        }
    } catch (err) {
        modal("error", err);
    } finally {
        setOldValues(valores);
    }
}

export default addPessoa;
