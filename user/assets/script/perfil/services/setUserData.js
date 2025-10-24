
async function setUserData(dadosPessoa) {

    try {

        const res = await fetch('http://localhost:8080/blusablusas/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPessoa)
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

export default setUserData;