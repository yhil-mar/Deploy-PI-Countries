module.exports = (param, option) => {
    
    // Opción 1 para palabra con primera mayúscula y el resto minúsculas
    // Opción 2 para palabra con todo en mayúsculas
    // Opción 3 para array de palabras con todo en mayúsculas

    if (option === 1) {
        param = param.toLowerCase()
        param = param[0].toUpperCase() + param.substring(1);

    } else if (option === 2) {
        param = param.toUpperCase();

    } else if (option === 3) {
        param = param.map(elem => {
            return elem.toUpperCase();
        });
    };

    return param;
};