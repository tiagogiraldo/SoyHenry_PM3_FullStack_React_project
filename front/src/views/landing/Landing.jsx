// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./Landing.module.css"
import companyLogo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/home');
    };

    return (
        <div>
            <div className={styles.landing}>
                <img src={companyLogo} alt="CDA NOVA" />
                <hr />
                <h1>NOVA</h1>
                <h2>  Su empresa para la revisión técno mecánica confiable  </h2>
                <hr/>
                <button type="submit" onClick={handleLoginClick}>Ingresar a la plataforma</button>                
            </div>
        </div>
    );
}

