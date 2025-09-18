import getValues from "../utils/getValues.js";
import getInputs from "../utils/getInputs.js";
import validarInput from "../../common/validarInputs.js";
import atualizarTabela from "./atualizarTabela.js";
import limparForm from "../utils/limparForms.js";
import modal from "../../common/modal.js";
import setOldValues from "../utils/setOldValues.js";

//função para atualizar linhas do bancod e dados em uso;
function atualizarProduto() {

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
    verificar.push(validarInput(input.situacao)); 

    const verificador = verificar.filter(item => item === false);

    try {
        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/produtos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_produto": valores.id_produto,
                    "id_descricao": valores.id_descricao,
                    "denominacao": valores.denominacao,
                    "quantidade_estoque": valores.estoque,
                    "preco": valores.preco,
                    "descricao": valores.descricao,
                    "imagem_url": valores.url,
                    "cor": valores.cor,
                    "tecido": valores.tecido,
                    "tamanho": valores.tamanho,
                    "categoria": valores.categoria,
                    "situacao": valores.situacao
                })
            })
                .then(res => {
                    if (res.ok) {

                        atualizarTabela();
                        limparForm();
                        modal("Sucesso", "Produto atualizado com sucesso!");
                        return res.json()
                    }

                    if (res.status === 500) {
                        modal("ERRO no 00000 - " + res.status, "o servidor não respondeu sua solicitação!");
                    }
                    if (!res.ok) {
                        modal("ERROR na requisição", "outros erros de requisição. O servidor retornou: " + res.statusText)
                    }
                })
                .then(res => { if (!res) return })
                .catch((error) => { console.error(error) })
        } else {
            modal("ERRO DE PREENCHIMENTO", "Preencha corretamente os campos em vermelho!!!!!");
        }
    } catch (error) {
        error
    } finally {
        setOldValues(valores);
    }
}

export default atualizarProduto;