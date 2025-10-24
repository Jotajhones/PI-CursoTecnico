import calcularIndiceCarrinho from "./calcularIndiceCarrinho.js";
import criarvenda from "./criarVenda.js";

async function carrinhoDeCompras(id_venda) {
    try {
        const res = await fetch(`http://localhost:8080/blusablusas/vendas/${id_venda}`);

        if (res.status == 404) {
            throw new Error('Venda não encontrada (404)');
        }

        const data = await res.json();
        
        if (data && data.length > 0 && data[0].situacao != 'andamento') {
            criarvenda();
        }

    } catch (error) {
        if (error.message === 'Venda não encontrada (404)' || error.message.includes('Failed to fetch')) {
             criarvenda();
        } else {
             console.error("Erro ao processar a venda:", error);
        }
    }
    
    calcularIndiceCarrinho();
}

export default carrinhoDeCompras;