import imageError from "../../assets/freepick.jpg"
import styles from "./CardError.module.css"

export default function Card() {
    return (
        <div className={styles.cardError}>
            <img  src={imageError} alt="404 Error" />
            <hr/>
            <p>Image by <a href="https://www.freepik.com/free-vector/404-error-web-template-with-funny-monster_2548710.htm#query=404%20page%20found&position=5&from_view=keyword&track=ais_user&uuid=2d434a7a-9f85-4745-8ef2-eec98061c8aa">Freepik</a></p>

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