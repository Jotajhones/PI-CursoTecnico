import getValues from "../utils/getValues.js";
import getInputs from "../utils/getInputs.js";
import validarInput from "../../common/validarInputs.js";
import atualizarTabela from "./atualizarTabela.js";
import limparForm from "../utils/limparForms.js";
import modal from "../../common/modal.js";
import setOldValues from "../utils/setOldValues.js";

//FUnção para add produto ao banco em uso;
function adicionarProduto() {

    const verificar = [];

    const valores = getValues(); 
    const input = getInputs();

    verificar.push(validarInput(input.denominacao));
    verificar.push(validarInput(input.preco));
    verificar.push(validarInput(input.estoque));
    verificar.push(validarInput(input.descricao));
    verificar.push(validarInput(input.url));
    verificar.push(validarInput(input.cor));
    verificar.push(validarInput(input.tecido));
    verificar.push(validarInput(input.categoria));
    verificar.push(validarInput(input.tamanho));

    const verificador = verificar.filter(item => item === false);

    try {
        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "denominacao": valores.denominacao,
                    "estoque": valores.estoque,
                    "preco": valores.preco,
                    "descricao": valores.descricao,
                    "url": valores.url,
                    "cor": valores.cor,
                    "tecido": valores.tecido,
                    "tamanho": valores.tamanho,
                    "categoria": valores.categoria
                })
            })
                .then(res => {
                    if (res.ok) {

                        atualizarTabela();
                        limparForm();
                        modal("Sucesso", "Produto adicionado com sucesso!");
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
            modal("ERRO DE PREENCHIMENTO", "Preencha corretamente os campos em vermelho!");
        }
    } catch (err) {
        modal("error", err)
    } finally {
        setOldValues(valores);
    }
}

export default adicionarProduto;