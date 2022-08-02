
export const nameValidate = (name) => {
    const regExName = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;

    if (name.length >= 18 || name.length <= 3) {
        return false;
    };
    if (!regExName.test(name)) {
        return false;
    };
    return true;
    /* 
    regExName : 
                - min 3 characters
                - max 18 characters
                -Starts with capital letter
                - admit spanish alfabet
    */
}

export const passwordValidate = (pass) => {
    /* const regExComplete = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,15}$/; */
    const onlyNumbers = /^(.*\d){6,15}$/;
    
    if (pass.length >= 18 || pass.length <= 3) {
        return false;
    };
    if (!onlyNumbers.test(pass)) {
        return false;
    };
    
    return true;

    /* regExComplete : 
                        - Minimo 8 caracteres
                        - Maximo 15
                        - Al menos una letra mayúscula
                        - Al menos una letra minucula
                        - Al menos un dígito
                        - No espacios en blanco
                        - Al menos 1 caracter especial 
        onlyNumbers:
                        - Minimo 6 caracteres
                        - Maximo 15 caracteres
    */
}