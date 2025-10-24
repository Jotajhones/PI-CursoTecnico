import getInputs from "../../commons/utils/getInput.js";
import carregarFone from "./carregarFone.js";
import modal from "../../../common/modal.js";
import validarInput from "../../commons/utils/validarInput.js"

function updateFone(id, id_telefone) {

    const params = new URLSearchParams(window.location.search);
    const id_pessoa = params.get('id_pessoa');

    const verificar = [];

    const ddd = document.querySelector(`#ddd${id}`);
    const numero = document.querySelector(`#numero${id}`);
    const tipo = document.querySelector(`#tipo${id}`);

    // verificar.push(validarInput(ddd));
    verificar.push(validarInput(numero));
    verificar.push(validarInput(tipo));

    const verificador = verificar.filter(item => item === false);

    try {

        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/fone', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_telefone": id_telefone,
                    "numero": numero.value,
                    "tipo": tipo.value
                }) 
            })
                .then(res => {
                    if (res.ok) {

                        const input = getInputs();
                        input.containerTelefone.innerHTML = "";

                        carregarFone(id_pessoa);

                        modal("Sucesso", "Telefone atualizado com sucesso!");
                        return res.json()
                    }
                    if (res.status === 500) {
                        modal("ERRO no 00000 - " + res.status, "o servidor não respondeu sua solicitação!");
                    }
                    if (!res.ok) {
                        modal("ERROR na requisição", "outros erros de requisição. O servidor retornou: " + res.statusText)
                    }
                })
                .then(res => {
                    if (!res) { return }
                })
                .catch(err => { console.error(err) });
        } else {
            modal("ERRO DE PREENCHIMENTO", "Você não pode atualizar um telefone não cadastro! <br> <strong>Atualize um telefone já cadastrado</strong>.");
        }
    } catch (err) {
        modal("error", err);
    }
}

export default updateFone;
