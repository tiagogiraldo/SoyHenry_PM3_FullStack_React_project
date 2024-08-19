// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from "./Contact.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import validateContact from "../../helpers/ContactValidation"


const POSTCOMMENT_URL = "https://jsonplaceholder.typicode.com/comments"


export default function Contact() {

  const navigate = useNavigate()
    
  // *Estado inicial
    const initialState = {
      name: "",
      email: "",
      comment: "",
  }

  //* Estados
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  //* Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors(validateContact({ ...user, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
        name: user.name,
        email: user.email,
        comment: user.comment,
    };
    
  axios
      .post(POSTCOMMENT_URL, userData)
      // eslint-disable-next-line no-unused-vars
      .then(( {data} ) => {
          alert("Mensaje enviado")
          setUser(initialState);
          navigate("/home")
      }).catch((error) => alert(error.message));
  }
  const handleReset = (event) => {
    event.preventDefault();
    setUser(initialState);
  };
  const formData = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Dirección electrónica", name: "email", type: "text" },
    { label: "Comentarios", name: "comment", type: "text" },
 
]

return (
  <div>
      <h2 className={styles.cardTitle}>Contacto</h2>
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
              >Enviar</button>
          </div>
      </form>
  </div >
);
}