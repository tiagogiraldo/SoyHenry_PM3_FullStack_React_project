import companyLogo from "../../assets/logo.png"
import styles from "./Card.module.css"

export default function Card() {
    return (
        <div className={styles.cardContainer}>
            <img  src={companyLogo} alt="CDA NOVA" />
            <hr/>
            <h1>NOVA</h1>
            <h2>- Su empresa para la revisión técno mecánica confiable- </h2>
            <p> Bienvenidos a la página de agentamiento de citas para la revisión
                técno mécanica de su vehículo.
            </p>
        </div>
    )
}


/* Desarrollada por Ariel para ejemplo de página de incil */

// export default function Card() {
//     return (
//         <div className={styles.cardContainer}>
//             <img src={carImage} alt="Car image" />
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                 Fuga, molestias? Minima asperiores, id facere, ex et, 
//                 voluptate non dolorem fugiat laudantium molestias est 
//                 blanditiis aliquam! Aut incidunt laborum quaerat non.
//             </p>
//         </div>
//     )
// }