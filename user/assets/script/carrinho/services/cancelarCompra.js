import modal from "../../commons/modal.js";
import modalAlt from "../../commons/modalAlt.js";
import caixaDialogo from "../../commons/caixaDialogo.js";

async function cancelarCompra() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_venda = urlParams.get('id_venda');
    const id_usuario = urlParams.get('id_usuario')

    const userResponse = await caixaDialogo('Tem certeza que deseja cancelar esta compra?');

    if (userResponse) {
        try {
            const res = await fetch(`http://localhost:8080/blusablusas/vendas/descricao/${id_venda}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "situacao_venda": "cancelada"
                })
            });


            if (res.ok) {
                modalAlt('sucesso', 'Compra cancelada voce sera redirecionado(a)!');
                setTimeout(() => {
                    window.location.href = `./historico.html?id_usuario=${id_usuario}`;
                }, 4000);
            } else {

                modalAlt('erro', `Erro ao Atualizar item. Status: ${res.status}`);
            }
        } catch (error) {

            console.error('Erro de Rede:', error);
            modal('ERRO 503', 'Serviço Indisponivel');
        }
    }
}

export default cancelarCompra;