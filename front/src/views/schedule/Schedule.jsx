// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Schedule.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const POSTSCHEDULE_URL = "http://localhost:3000/appointments/schedule";

export default function Schedule() {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.actualUser?.userData.user.id);

    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [userId, navigate]);

    const initialState = {
        date: "",
        hours: "08",
        minutes: "00",
        description: "",
    };

    const [appointment, setAppointment] = useState(initialState);
    const [errors, setErrors] = useState({
        date: "Debe ingresar una fecha",
    });

    const isWeekend = (date) => {
        const day = new Date(date).getDay();
        return day === 5 || day === 6; //* 5: sábado, 6: domingo
    };

    // eslint-disable-next-line no-unused-vars
    const validateSchedule = ({ date, hours, minutes, description }) => {
        const errors = {};
        if (!date) errors.date = "Inresar fecha";
        else if (isWeekend(date)) errors.date = "La fecha seleccionada es un fin de semana";
        if (!description) errors.description = "Ingresar una descripción";
        else if (description.length < 5) errors.description = "La descripción debe ser de al menos 5 caracteres";
        else if (description.length > 25) errors.description = "La descrpción debe ser menor de 25 caracteres";
        return errors;
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setAppointment({ ...appointment, [name]: value });
        setErrors(validateSchedule(appointment));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
            date: appointment.date,
            time: `${appointment.hours}:${appointment.minutes}`,
            userId,
            status: "active",
            description: appointment.description,
        };
        axios
            .post(POSTSCHEDULE_URL, newAppointment)
            .then(({ data }) => {
                alert(`Ha sido creada la reserva.`);
                setAppointment(initialState);
                navigate("/appointments");
            })
            .catch((error) => {
                alert(`Error: ${error.response.data.error}`);
            });
    };


    const validHours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];
    const validMinutes = ["00", "30"];

    function getTomorrow() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    }

    function getFourteenDaysAhead() {
        const today = new Date();
        const fourteenDaysAhead = new Date(today);
        fourteenDaysAhead.setDate(fourteenDaysAhead.getDate() + 13);
        return fourteenDaysAhead.toISOString().split("T")[0];
    }

    return (
        <div>
            <h2 className={styles.cardTitle}>Nueva Reserva</h2>
            <br />
            <form className={styles.cardForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Fecha: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={getTomorrow()}
                        max={getFourteenDaysAhead()}
                        value={appointment.date}
                        onChange={handleChange}
                    />
                    {errors.date && <span style={{ color: "orange" }}>{errors.date}</span>}
                </div>
                <div>
                    <label htmlFor="hours">Hora: </label>
                    <select id="hours" name="hours" value={appointment.hours} onChange={handleChange}>
                        {validHours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="minutes">Minutos: </label>
                    <select id="minutes" name="minutes" value={appointment.minutes} onChange={handleChange}>
                        {validMinutes.map((minute) => (
                            <option key={minute} value={minute}>
                                {minute}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Descripción: </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={appointment.description}
                        placeholder="Ingresar descripción..."
                        onChange={handleChange}
                    />
                    {errors.description && <span style={{ color: "orange" }}>{errors.description}</span>}
                </div>
                <button type="submit">Crear Reserva</button>
            </form>
        </div>
    );
}
