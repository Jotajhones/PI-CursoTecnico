import carregarHeaderLogado from "./carregarHeaderLogado.js";
import loginStorage from "./loginStorage.js"; // Importação mantida, mas não usada nesta função

async function verificarLoginAtivo() {

    const token = window.localStorage.getItem("BlusasBlusasToken");

    if (token) {


        await fetch('http://localhost:8080/blusablusas/logado', { 
            method: 'POST',
            headers: { 
                // Usa o token no cabeçalho Authorization
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({}) 
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    console.warn('Sessão expirada ou inválida. Redirecionando para login.');
                    
                    window.localStorage.removeItem("BlusasBlusasUser");
                    window.localStorage.removeItem("BlusasBlusasToken"); 
                    
                    window.location.href = '/login.html';
                    
                    return null;
                }
                return res.json();
            })
            .then(res => {
                if (res && res.length > 0) {
                    const usuarioData = res[0];

                    window.localStorage.setItem("BlusasBlusasUser", JSON.stringify(usuarioData));
                    
                    carregarHeaderLogado(usuarioData);
                    
                }
            })
            .catch(error => {
                console.error('Erro de rede ao verificar sessão:', error);
            });

    } else {
        console.log("Nenhum usuário salvo. Sessão não verificada.");
    }
}

export default verificarLoginAtivo;
