// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import axios from "axios"
import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom"
import validateUser from "../../helpers/RegisterValidation"

// {
//     "name": "Ramón Ramones",
//     "email": "rramon@mail.com",
//     "birthdate": "1949-09-09",
//     "nDni": 1111111,
//     "username": "ramonramon",
//     "password": "Clave123+"
//     "comfirmPassword:"Clave123+"
// }
const POSTUSER_URL = "http://localhost:3000/users/register"

export default function Register() {
    const navigate = useNavigate()

    // *Estado inicial
    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        confirmPassword: ""
    }

    //* Estados
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);


    //* Handlers
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateUser({ ...user, [name]: value }))
    };

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            username: user.username,
            password: user.password,
        };
        
        axios
            .post(POSTUSER_URL, userData)
            .then(({ data }) => {
                alert(data.message)
                setUser(initialState);
                navigate("/")
            }).catch((error) => alert(error.message));
    }

    const handleReset = (event) => {
        event.preventDefault();
        setUser(initialState);
    };

    const formData = [
        { label: "Nombre", name: "name", type: "text" },
        { label: "Nombre de Usuario", name: "username", type: "text" },
        { label: "Contraseña", name: "password", type: "password" },
        { label: "Confirmar Contraseña", name: "confirmPassword", type: "password" },
        { label: "Dirección electrónica", name: "email", type: "text" },
        { label: "Fecha de Nacimiento", name: "birthdate", type: "date" },
        { label: "Número de DNI", name: "nDni", type: "text" },
    ]

    return (
        <div>
            <h2 className={styles.cardTitle}>Registro De Nuevo Usuario</h2>
            <br />
            <form className={styles.cardForm}>
                {formData.map(({ label, name, type }) => (
                    <div key={name}>
                        <label>{label}</label>
                        <input
                            className={styles.cardInput}
                            id={name}
                            name={name}
                            type={type}
                            placeholder={`ingresar ${label.toLowerCase()}`}
                            onChange={handleChange}
                        />
                        {
                            errors[name] && (
                                <span style={{ color: "orange" }}>{errors[name]}</span>
                            )}
                    </div>
                ))}
                <hr />
                <div>
                    < button type="submit" onSubmit={handleReset}> Borrar Formulario</button>
                    <button
                        type="submit"
                        disabled={Object.keys(user).some(e => !user[e])}
                        // disabled={Object.keys(erros).some(e=> errors[e])}
                        onClick={handleSubmit}
                        // onAuxClick={handleSubmit}
                    >Registrar</button>
                </div>
            </form>
        </div >
    );
}