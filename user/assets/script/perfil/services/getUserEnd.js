import modal from "../../commons/modal.js";

async function getUserEnd(id_pessoa) {

    try {

        const res = await fetch('http://localhost:8080/blusablusas/endereco', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id_pessoa": id_pessoa })
        });

        if (res.ok) {
            const userEnd = await res.json();
            return userEnd;
        } else if (!res.ok) {
            modal('Erro', 'Não foi possível obter o endereço do usuário. Por favor, tente novamente mais tarde.');
        }

    } catch (error) {

        console.error('Erro ao buscar endereço do usuário:', error);
    }
}


export default getUserEnd;