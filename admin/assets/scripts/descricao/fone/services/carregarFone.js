import cardTelefone from "../utils/cardTelefone.js";

function carregarFone(id_pessoa) {

    const TelefoneVazio = {
        "id_pessoa": null,
        "ddd": null,
        "numero": null,
        "tipo": ""
    }

    fetch('http://localhost:8080/blusablusas/fone', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_pessoa": id_pessoa
        })
    })
        .then(res => res.json())
        .then(res => {
            let count = 0;

            if (res.length > 0) {

                res.forEach(element => {
                    cardTelefone(element, count);
                    count++
                });
                cardTelefone(TelefoneVazio, count);
            } else {
                cardTelefone(TelefoneVazio, count);
            }
        })
}

export default carregarFone;
