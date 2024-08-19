// import allAppointments from "../../helpers/AllAppointments"
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react"
import CardAppointment from "../../components/cardAppointment/CardAppointment"
import styles from "./Appointments.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserAppointments } from "../../redux/userSlice";

// const GETAPPOINTMENTS_URL = "http://localhost:3000/appointments"
const GETUSERBYID_URL = "http://localhost:3000/users/"
const PUTAPPOINTMENTCANCEL_URL = "http://localhost:3000/appointments/cancel/"

export default function Appointments() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // * 1. Traer "id" del ususario logeado:
    const actualUserId = useSelector(
        state => state.actualUser.userData.user.id
    );
    // * 2. Recuperar usuario por "id" y despachar sus turnos;
    useEffect(() => {
        axios
            .get(GETUSERBYID_URL + actualUserId)
            .then(response => response.data)
            .then(actualUser => {
                dispatch(setUserAppointments(actualUser.appointments))
            })
            .catch(error => console.log(error.message))
    }, [actualUserId, dispatch]);

    // * 3. Traer reservas del estado global

    // const [appointments, setAppointments] = useState([]);
    // useEffect(() => {
    //     axios.get(GETAPPOINTMENTS_URL)
    //         .then(response => response.data)
    //         .then(appointmentsFromDB => setUserAppointments(appointmentsFromDB));
    // }, []);

    const appointments = useSelector(state => state.actualUser.userAppointments);

    const login = useSelector(state => state.actualUser.userData.login);

    useEffect(() => {
        !login && navigate("/home")
        }, [login, navigate])

    const handleAppoinmentCancel =(appointmentId) =>{
        axios
            .put(PUTAPPOINTMENTCANCEL_URL + appointmentId)
            .then(response => response.data)
            // eslint-disable-next-line no-unused-vars
            .then(data =>{
                // * Actualiza los turnos desde el back
                axios
                    .get(GETUSERBYID_URL + actualUserId)
                    .then(response => response.data.appointments)
                    .then(appointments=>dispatch(setUserAppointments(appointments)))
                    .catch(error=>console.log(error.message))
            })
    }

    return (
        <div>
            <h1 className={styles.pageTitle}>Reservas De Turnos de Atención</h1>
            {
                appointments?.map(appointment => (
                    <CardAppointment
                        key={appointment.id}
                        id={appointment.id}
                        date={appointment.date}
                        time={appointment.time}
                        userId={appointment.userId}
                        status={appointment.status}
                        description={appointment.description}
                        handleAppoinmentCancel={handleAppoinmentCancel}
                    />
                ))
            }
        </div>
    )
}



// *   ESTADO       [{1}, {2}, ...]
// *  CardApointments => {1}


// useEffect(() => {
//     axios.get(GETAPPOINTMENTSURL)
//     .then(response => response.data)
// .then(appointmentsFromDB => setAppointments(appointmentsFromDB))
// }, [])

// No reconocial el array, hubo que hacerlo asi para que lo reconociera.
// Por la explicación de Ariel a alguien que preguntó lo mismo, es por que
// Pareciera que llega un objeto que arropa el array, por qué?? Ni idea


