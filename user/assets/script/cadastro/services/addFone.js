import modal from "../../commons/modal.js"

async function addFone(dadosUser) {
    try {

            fetch('http://localhost:8080/blusablusas/fone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosUser)
            })
                .then(res => {
                    if (res.ok) {

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

    } catch (err) {
        modal("error", err);
    }
}

export default addFone;