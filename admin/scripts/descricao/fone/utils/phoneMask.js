function phoneMask(numero, input) {
    // Remove tudo que não é dígito
    numero = (numero || '').replace(/\D/g, '');

    // Limita a 11 dígitos (2 DDD + 9 número)
    numero = numero.substring(0, 11);

    if (numero.length > 10) {
        // Celular com 9 dígitos: (xx) xxxxx-xxxx
        numero = numero.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (numero.length > 2) {
        // Fixo: (xx) xxxx-xxxx
        numero = numero.replace(/^(\d{2})(\d{0,5})(\d{0,4})/, function(_, ddd, parte1, parte2) {
            if (parte2) return `(${ddd}) ${parte1}-${parte2}`;
            if (parte1) return `(${ddd}) ${parte1}`;
            return `(${ddd}`;
        });
    } else if (numero.length > 0) {
        numero = numero.replace(/^(\d{0,2})/, '($1');
    }

    input.value = numero;
}

export default phoneMask;
