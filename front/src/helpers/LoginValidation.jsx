// eslint-disable-next-line no-unused-vars
import React from "react";

const validateUser = ({
    username,
    password,
}) => {
    const errors = {};
    
    if (!username) errors.username = "Ingresar un nombre de usuario"
    if (!password) errors.password = "Ingresar una contraseña"
    return errors;
};

export default validateUser