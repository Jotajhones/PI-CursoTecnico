function criarvenda() {
    let userString = window.localStorage.getItem('BlusasBlusasUser');
    userString = JSON.parse(userString);

    const id_usuario = userString.id_usuario;

    fetch('http://localhost:8080/blusablusas/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id_usuario": id_usuario,
            "id_pagamento": "1"
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log('Venda Criada');
        return
    })
    .catch(error => {
        console.error('Ocorreu um erro na requisição:', error);
    });
}

export default criarvenda;