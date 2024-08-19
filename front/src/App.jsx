// eslint-disable-next-line no-unused-vars
import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Landing from "./views/landing/Landing.jsx"
import Navbar from "./components/navbar/Navbar"
import Home from "./views/home/Home"
import Appointments from "./views/appointments/Appointments"
import Login from "./views/loging/Login"
import Register from "./views/register/Register.jsx"
import Schedule from "./views/schedule/Schedule.jsx"
import About from "./views/about/About.jsx"
import Contact from "./views/contact/Contact.jsx"
import ErrorPage from "./views/errorPage/ErrorPage.jsx"



function App() {
  const { pathname } = useLocation();

  return (
    <>
      {/* {pathname !== "/" && pathname !== "/404" ? <Navbar /> : null} */}
      {pathname !== "/" ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
