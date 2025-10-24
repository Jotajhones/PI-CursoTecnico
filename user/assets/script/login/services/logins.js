import validarInput from "../../commons/validarInput.js";
import modal from "../../commons/modal.js"
import loginStorage from "./loginStorage.js";
import criarvenda from "../../commons/criarVenda.js";

async function logIn() {

    const email = document.querySelector('#inputLoginEmail');
    const senha = document.querySelector('#inputLoginPassword');

    const verificar = [];

    verificar.push(validarInput(email));
    verificar.push(validarInput(senha));

    const verificador = verificar.filter(item => item === false);

    try {

        if (verificador.length === 0) {

            fetch('http://localhost:8080/blusablusas/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "usuario": email.value,
                    "senha": senha.value
                })
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(errorData => {
                            modal("Erro - Acesso Negado", `${errorData.message}`);
                            return Promise.reject(errorData);
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    
                    loginStorage(data); 
                    
                    if (data.usuario.ultima_venda == null) {
                        
                        criarvenda();
                    
                        window.location.href = '../../index.html'; 
                        
                    } else {
                        
                        window.location.href = '../../index.html';
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                })

        } else {
            modal("Erro de Preenchimento", "Preencha corretamente os campos!", "main")
        }

    } catch (error) {
        console.error("Erro ao tentar fazer o login:", error);
    }
}

export default logIn;
