// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import axios from "axios"
import styles from "./Login.module.css"
import validateUser from "../../helpers/LoginValidation"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserData } from "../../redux/userSlice"


// {
//     "username": "ramonramon",
//     "password": "Clave123+"
// }

const POSTUSER_URL = "http://localhost:3000/users/login"


export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // *Estado inicial
    const initialState = {
        username: "",
        password: "",
    };

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
            username: user.username,
            password: user.password,
        };

        axios
            .post(POSTUSER_URL, userData)
            .then(({ data }) => {
                dispatch(setUserData(data));
                alert("Usuario logeado");
                setUser(initialState);
                navigate("/home")
            }).catch((error) => alert(error?.response?.data?.message));
    }

    const formData = [
        { label: "Nombre de Usuario", name: "username", type: "text" },
        { label: "Contraseña", name: "password", type: "password" },
    ]

    return (
        <div>
            <h2 className={styles.cardTitle}>Iniciar Sesión</h2>
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
                        {errors[name] && (
                            <span style={{ color: "orange" }}>{errors[name]}</span>
                        )}
                    </div>
                ))}
                <hr />
                <div>
                    <button
                        type="submit"
                        disabled={Object.keys(user).some(e => !user[e])}
                        // onAuxClick={handleSubmit}
                        onClick={handleSubmit}
                    // disabled={Object.keys(erros).some(e=> errors[e])}
                    >Iniciar Sesión</button>
                </div>
            </form>
        </div >
    );
}