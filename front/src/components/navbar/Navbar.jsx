// eslint-disable-next-line no-unused-vars
import React from "react";
import logo from "../../assets/logo.png"
import avatar from "../../assets/avatar.png"
import styles from "../navbar/Navbar.module.css"
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserData } from "../../redux/userSlice";


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.actualUser?.userData);

  const handleLogout = () => {
    const confirm = window.confirm("¿Desea cerrar sesión?");
    if (confirm) {
      dispatch(setUserData({ login: false, user: { id: false } }));
      navigate("/");
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.LinkSection}>
        <Link to="/home" className={styles.link}>
          <span>PRINCIPAL</span>
        </Link>
        {userData?.login && (
          <>
            <Link to="/appointments" className={styles.link}>
              <span>RESERVAS</span>
            </Link>
            <Link to="/schedule" className={styles.link}>
              <span>AGENDAR CITA</span>
            </Link>
          </>
        )}
        <Link to="/about" className={styles.link}>
          <span>ACERCA</span>
        </Link>
        <Link to="/contact" className={styles.link}>
          <span>CONTACTO</span>
        </Link>
        <Link to="/register" className={styles.link}>
          <span>REGISTRARSE</span>
        </Link>
        {userData?.login ? (
          <Link onClick={handleLogout} className={styles.link}>
            <span>LOGOUT</span>
          </Link>
        ) : (
          <Link to="/login" className={styles.link}>
            <span>LOGIN</span>
          </Link>
        )}
      </div>
      <div className={styles.avatarSection}>
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
}
// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import logo from "../../assets/logo.png"
// import avatar from "../../assets/avatar.png"
// import styles from "../navbar/Navbar.module.css"
// // eslint-disable-next-line no-unused-vars
// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setUserData } from "../../redux/userSlice";

// export default function Navbar() {
//     // const {pathname } = useLocation()

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     const login = useSelector(state => state?.actualUser?.userData.login)

//     // * login = true || false

//     const handleLogout = () =>{
//         const confirm = window.confirm("¿Desea cerrar sesión?")
//         if(confirm){
//             dispatch(setUserData({login:false, user:{ id: false, }, }))
//             navigate("/")
//         }
//     }
    
//     return (
//         <div className={styles.navbarContainer}>
//             <div className={styles.logoSection}>
//                 <img src={logo} alt="logo" />
//             </div>
//             <div className={styles.LinkSection}>
//                 <Link to="/home" className={styles.link}>
//                     <span>PRINCIPAL</span>
//                 </Link>
//                 {login && (
//                     <Link to="/appointments" className={styles.link}>
//                         <span>RESERVAS</span>
//                     </Link>
//                 )}
//                 {login &&(
//                     <Link to="/schedule" className={styles.link}>
//                     <span>AGENDAR CITA</span>
//                 </Link>                                        
//                 )}
//                 <Link to="/about" className={styles.link}>
//                     <span>ACERCA</span>
//                 </Link>
//                 <Link to="/contact" className={styles.link}>
//                     <span>CONTACTO</span>
//                 </Link>
//                 <Link to="/register" className={styles.link}>
//                     <span>REGISTRARSE</span>
//                 </Link>
//                 {
//                     login && (
//                         <Link>
//                             <span onClick={handleLogout}>LOGOUT</span>
//                         </Link>
//                     ) : (
//                         <Link>
//                             <span>LOGIN</span>
//                         </Link>
//                     )
//                 }
//             </div>
//             <div className={styles.avatarSection}>
//                 <img src={avatar} alt="avatar" />
//             </div>

//         </div>
//     );
// }

// {pathname !== "/login" && pathname !== "/register" ?(    
//     <Link to="/appointments" className={styles.link}>
//         <span>RESERVAS</span>
//     </Link>

//  ):null}