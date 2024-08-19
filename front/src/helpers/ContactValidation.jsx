const nameRegExp = /^[a-z]+(\s+[a-z]+)*$/i;
const emailRegExp = /\S+@\S+\.\S+/;

const validateContact = ({
    name,
    email,
    comment
  }) => {
    const errors = {};
    if (!name) errors.name = "Ingresar un nombre"
    else {
      if (!nameRegExp.test(name)) errors.name = "Ingresar un nombre válido"
    }
    if (!email) errors.email = "Ingresar un email"
    else {
      if (!emailRegExp.test(email)) errors.email = "Ingresar un email válido"
    }
    if (!comment) errors.comment = "Ingresar un comentario"
    return errors;
  };
  export default  validateContact;