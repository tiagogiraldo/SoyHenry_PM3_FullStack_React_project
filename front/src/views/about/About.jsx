// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./About.module.css"
import carShop from "../../assets/easy-peasy.ai.png"



export default function About() {
    return (
        <div>
            <div className={styles.landing}>
                <img src={carShop} alt="CDA NOVA" />
                <hr />
                <h1>NOVA</h1>
                <h2>  Su empresa para la revisión técno mecánica confiable  </h2>
                <hr/>
                <p>Nova hace parte del proyecto de turnos, necesario para avanzar en el módulo 3 del Bootcamp de SoyHenry</p>        
            </div>
        </div>
    );
}