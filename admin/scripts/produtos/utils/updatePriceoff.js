import getValues from "./getValues.js";

async function updatePriceoff(id_produto) {

    const valores = getValues();

    const response = await fetch(`http://localhost:8080/blusablusas/produtos/${id_produto}`);
    const res = await response.json();

    if (res.length > 0) {
        const item = res[0];

        if (valores.promocao > item.porcentagem) {

            let newPreco = (item.preco * (1 - (valores.promocao / 100))).toFixed(2);
            return newPreco;

        } else if (valores.promocao <= item.porcentagem) {

            let newPreco = valores.preco;
            return newPreco;

        } 
    }

    return undefined;
}

export default updatePriceoff;