import getInputs from "../../commons/utils/getInput.js";
import carregarFone from "./carregarFone.js";
import modal from "../../../common/modal.js";
import validarInput from "../../commons/utils/validarInput.js"

//Função que deleta um telefone;
function deletarFone(id, id_telefone) {

    const params = new URLSearchParams(window.location.search);
    const id_pessoa = params.get('id_pessoa');


    const verificar = [];

    const ddd = document.querySelector(`#ddd${id}`);
    const numero = document.querySelector(`#numero${id}`);
    const tipo = document.querySelector(`#tipo${id}`);

    verificar.push(validarInput(ddd));
    verificar.push(validarInput(numero));
    verificar.push(validarInput(tipo));

    const verificador = verificar.filter(item => item === false);

    try {

        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/fone', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_telefone": id_telefone
                })
            })
                .then(res => {
                    if (res.ok) {
                        //tratamento de responses
                        const input = getInputs();
                        input.containerTelefone.innerHTML = "";

                        carregarFone(id_pessoa);

                        modal("Sucesso", "Telefone deletado com sucesso!");
                        return res.json()
                    }
                    if (res.status === 500) {
                        modal("ERRO no 00000 - " + res.status, "o servidor não respondeu sua solicitação!");
                    }
                    if (!res.ok) {
                        modal("ERROR na requisição", "outros erros de requisição. O servidor retornou: " + res.statusText)
                    }
                })
                .catch(err => { console.error(err) });
        } else {
            modal("ERRO DE PREENCHIMENTO", "Você não pode deletar um telefone não cadastro! <br> <strong>Delete um telefone já cadastrado</strong>.");
        }

    } catch (err) {
        modal("error", err);
    }
}

export default deletarFone;
