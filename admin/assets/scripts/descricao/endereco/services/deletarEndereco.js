import getInputs from "../../commons/utils/getInput.js";
import carregarEndereco from "./carregarEndereco.js";
import modal from "../../../common/modal.js";
import validarInput from "../../commons/utils/validarInput.js";

function deletarEndereco(id, id_endereco) {
    const params = new URLSearchParams(window.location.search);
    const id_pessoa = params.get('id_pessoa');

    const verificar = [];

    const cep = document.querySelector(`#cep${id}`);
    const rua = document.querySelector(`#rua${id}`);
    const cidade = document.querySelector(`#cidade${id}`);
    const bairro = document.querySelector(`#bairro${id}`);
    const complemento = document.querySelector(`#complemento${id}`);
    const numeroEnd = document.querySelector(`#numeroEnd${id}`);
    const uf = document.querySelector(`#uf${id}`);

    verificar.push(validarInput(cep));
    verificar.push(validarInput(rua));
    verificar.push(validarInput(cidade));
    verificar.push(validarInput(bairro));
    verificar.push(validarInput(complemento));
    verificar.push(validarInput(numeroEnd));
    verificar.push(validarInput(uf));

    const verificador = verificar.filter(item => item === false);

    try {

        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/endereco', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_endereco": id_endereco
                })
            })
                .then(res => {
                    if (res.ok) {

                        const input = getInputs();
                        input.containerEndereco.innerHTML = "";

                        carregarEndereco(id_pessoa);

                        modal("Sucesso", "Endereco deletado com sucesso!");
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
            modal("ERRO DE PREENCHIMENTO", "Você não pode deletar um Endereco não cadastro! <br> <strong>Delete um Endereco já cadastrado</strong>.");
        }

    } catch (err) {
        modal("error", err);
    }
}

export default deletarEndereco;
