import getValues from "../utils/getValues.js";
import getInputs from "../utils/getInputs.js";
import validarInput from "../../common/validarInputs.js";
import atualizarTabela from "./atualizarTabela.js";
import limparForm from "../utils/limparForms.js";
import modal from "../../common/modal.js";

//função para deletar linha do banco de dados em uso;
export function deletarProduto() {

    const verificar = []; 

    const valores = getValues();
    const input = getInputs();

    verificar.push(validarInput(input.id_descricao));
    verificar.push(validarInput(input.id_produto));

    const verificador = verificar.filter(item => item === false);

    try {
        if (verificador.length === 0) {
            fetch('http://localhost:8080/blusablusas/produtos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id_produto": valores.id_produto,
                    "id_descricao": valores.id_descricao
                })
            })
                .then(res => {
                    if (res.ok) {

                        atualizarTabela();
                        limparForm();
                        modal("Sucesso", "Produto deletado com sucesso!");
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
            modal("ERRO DE PREENCHIMENTO", "Selecione um produto para deleta-lo!");
        }
    } catch (error) {
        error
    } finally {
        limparForm();
    }
}

export default deletarProduto;
