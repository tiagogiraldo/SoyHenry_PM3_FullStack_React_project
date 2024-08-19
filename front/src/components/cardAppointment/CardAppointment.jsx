import styles from "./CardAppointment.module.css"

export default function CardAppointment(
    
    // eslint-disable-next-line react/prop-types, no-unused-vars
    { id, date, time, userId, status, description, handleAppoinmentCancel
    }
) {
    // * Formato de fecha
    date = new Date(date);
    // eslint-disable-next-line react/prop-types
    const formatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const handleClick = () => {
        if(
            window.confirm(`¿Desea cancelar el turno del día ${formatDate} a las ${time}?`)
        ) {
            handleAppoinmentCancel(id)
        }

    }

    return (
        <div className={styles.container}>
            <span>{formatDate}</span>
            <span>{time}</span>
            <span>{description}</span>
            {
                status === "active" ?
                    (<span className={styles.active} onClick={handleClick}>Activa</span>)
                    :
                    (<span className={styles.cancelled} >Cancelada</span>)
            }
        </div>
    )
}