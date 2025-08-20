import getValues from "../commons/getValues.js";
import getInputs from "../commons/getInputs.js";
import validarInput from "../../common/validarInputs.js";
import atualizarTabela from "./atualizarTabela.js";
import limparForm from "../commons/limparForm.js";
import modal from "../../common/modal.js";
import setOldValues from "../commons/setOldValues.js";

//Função para deletar um usuario;
function deletarPessoa() {
    const verificar = [];

    const valores = getValues();
    const input = getInputs();

    verificar.push(validarInput(input.id_pessoa));
    verificar.push(validarInput(input.id_usuario));

    const verificador = verificar.filter(item => item === false);

    try {
        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_usuario": valores.id_usuario,
                    "id_pessoa": valores.id_pessoa
                })
            })
                .then(res => {
                    if (res.ok) {

                        atualizarTabela();
                        limparForm();
                        modal("Sucesso", "Usuario deletado com sucesso!");

                    } else if (res.status === 500) {

                        modal("ERROR 500 - " + res.status, "o servidor não respondeu sua solicitação!");

                    } else if (!res.ok) {

                        modal("ERROR na requisição", "Outros erros de requisição. \nRetorno: " + res.statusText);
                    }
                    return res.json();
                })
                .catch(err => { console.error(err) });

        } else {
            modal("ERRO DE SELEÇÃO", "Selecione o usuario que deseja excluir!");
        }
    } catch (err) {
        modal("error", err);
    } finally {
        setOldValues(valores);
    }
}

export default deletarPessoa;
