async function setUserEnd(dadosEndereco) {
    try {

        const res = await fetch('http://localhost:8080/blusablusas/endereco', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosEndereco)
        });

        if (res.ok) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.error('Erro ao atualizar dados do usuário:', err);
    }
}

export default setUserEnd;