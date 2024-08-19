// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import axios from "axios"
import styles from "./Schedule.module.css"
import moment from 'moment'
// {
    // "date": "2024-07-17",
    // "time": "08:00",
    // "userId": 3,
    // "status": "active",
    // "description": "Descripción de la cita 5"
// }
const POSTUSER_URL = "http://localhost:3000/users/register"

export default function Schedule() {
    // *Estado inicial
    const initialState = {
        date: "",        
        time: "",
        userId: "",
        status: "",
        description: ""
    }

    //* Estados
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    //* Validación

    const validateSchedule = ({
        date,
        time,
        userId,
        status,
        description
    }) => {
        const errors = {};
        const today = new Date();
        const targetDate = date //new Date('2023-03-15'); // or any other date string
        
        const startTime = moment('09:00', 'HH:mm'); // 09:00 am
        const endTime = moment('17:00', 'HH:mm'); // 05:00 pm
        const currentTime = moment(time, 'HH:mm'); // or any other time string
                
        if (targetDate.valueOf() > today.valueOf()) errors.date="La fecha de la cita debe ser mayor al día de hoy"
        if (currentTime.isBetween(startTime, endTime))
        if (!userId) errors.userId = "Ingresar un nombre de usuario"
        if (description.length >= 10) errors.description = "Por favor agregue más detalle en la descripción"
        return errors;
    };

    //* Handlers
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setErrors(validateSchedule({ ...user, [name]: value }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            date: user.date,
            time: user.time,
            userId: user.userId,
            status: "active",
            description: user.description,
        };
        console.log(userData);
        axios
            .post(POSTUSER_URL, userData)
            .then(({ data }) => {
                alert(data.message)
                setUser(initialState);
            }).catch((error) => alert(error.message));
    }

    const handleReset = (event) => {
        event.preventDefault();
        setUser(initialState);
    };

    const formData = [
        { label: "User Id", name: "userId", type: "text" },
        { label: "Fecha cita", name: "date", type: "date" },
        { label: "Hora", name: "time", type: "time" },
        { label: "Estado reserva", name: "status", type: "text" },
        { label: "Descripción reserva", name: "description", type: "text" },
    ]

    return (
        <div>
            <h2 className={styles.cardTitle}>Registro</h2>
            <hr />
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