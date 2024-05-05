import React from 'react'
import {Link, useNavigate} from 'react-router-dom';

const Admin = ({logueado}) => {
  const rol = localStorage.getItem('rol');
  const navigate = useNavigate()
  return (
    <div>
      <h1>{
        (logueado && (rol == 3)) ? (<>
        <h1>SOY ADMIN</h1>
        </>) : navigate("/inicioSesion")
      }</h1>
    </div>
  )
}

export default Admin
