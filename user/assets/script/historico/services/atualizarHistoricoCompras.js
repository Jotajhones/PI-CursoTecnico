import cardHistorico from "../utils/cardHistorico.js"

async function atualizarHistoricoCompras(id_usuario) {

    const res = await fetch(`http://localhost:8080/blusablusas/vendas/${id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {

        const data = await res.json();

        // console.log(data);

        const tabela = document.querySelector('.historicoCompras');
        tabela.innerHTML = "";

        let user = window.localStorage.getItem("BlusasBlusasUser");
        user = JSON.parse(user);

        data.forEach(element => {

            if (element.id_venda != user.ultima_venda && element.situacao == 'andamento') {
                return
            } else {
                cardHistorico(tabela, element);
            }
        });
    }

}

export default atualizarHistoricoCompras;

