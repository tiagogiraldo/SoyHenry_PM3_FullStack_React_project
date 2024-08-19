const nameRegExp = /^[a-z]+(\s+[a-z]+)*$/i;
const emailRegExp = /\S+@\S+\.\S+/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\d\s])(?=.*\d).{8,}$/


function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthA = today.getMonth() - birthDate.getMonth();
    if (monthA < 0 || (monthA === 0 && today.getDate() < birthDate.getDate())) 
        {
            age;
        }
    return age;
}

const supLimAge = 125
const infLimAge = 18

const validateUser = ({
    name,
    email,
    birthdate,
    nDni,
    username,
    password,
    confirmPassword
}) => {
    const age = calculateAge(birthdate);
    const errors = {};
    if (!name) errors.name = "Ingresar un nombre"
    else {
        if (!nameRegExp.test(name)) errors.name = "Ingresar un nombre válido"
    }
    if (!email) errors.email = "Ingresar un email"
    else {
        if (!emailRegExp.test(email)) errors.email = "Ingresar un email válido"
    }
    if (!birthdate) errors.birthdate = "Ingresar una fecha"
    else if ((age < infLimAge) || (age >= supLimAge)) {
        errors.birthdate = `Debe tener más de ${infLimAge} años o menos de ${supLimAge}   para registrarse`;
    }
    if (!nDni) errors.nDni = "Ingresar un Dni"
    if (!username) errors.username = "Ingresar un nombre de usuario"
    if (!password) errors.password = "Ingresar una contraseña"
    else {
        if (!passwordRegExp.test(password))
            errors.password = "La contraseña debe tener una mayúscula, una mínuscula, un número, un carácter especial y tener una longitud de 8 carácteres"
    }
    if (confirmPassword !== password)
        errors.confirmPassword = "La confirmación de la contraseña debe ser igual a la contraseña"
    return errors;
};

export default validateUser