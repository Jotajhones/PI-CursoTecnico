function phoneMask(input) {
    let value = input.value;

    value = value.replace(/\D/g, '');
    value = value.substring(0, 11);

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{1,})$/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d{1,2})$/, '($1');
    }

    input.value = value;
}

export default phoneMask;