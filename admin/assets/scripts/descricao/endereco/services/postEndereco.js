import getInputs from "../../commons/utils/getInput.js";
import carregarEndereco from "./carregarEndereco.js";
import modal from "../../../common/modal.js";
import validarInput from "../../commons/utils/validarInput.js";

//Função para adicionar um endereço via interface
function postEndereco(id) {

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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "cep": cep.value,
                    "rua": rua.value,
                    "cidade": cidade.value,
                    "bairro": bairro.value,
                    "complemento": complemento.value,
                    "numero": numeroEnd.value,
                    "uf": uf.value,
                    "id_pessoa": id_pessoa
                })
            })
                .then(res => {
                    //tratamento dos statusCode das responses;
                    if (res.ok) {

                        const input = getInputs();
                        input.containerEndereco.innerHTML = "";

                        carregarEndereco(id_pessoa);

                        modal("Sucesso", "Endereco adicionado com sucesso!");
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
            modal("ERRO DE PREENCHIMENTO", "Preencha corretamente os campos em vermelho!");
        }
    } catch (err) {
        modal("error", err);
    }
}

export default postEndereco;
