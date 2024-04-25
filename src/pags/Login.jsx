import React from 'react'

//Logos Importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";

import {Link, useNavigate} from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    return (

        //logins es mi body para poder ajustar la ventana de inicio de sesion
        <div className='logins'>

            {/* Div que contendra el inicio de sesion */}
            <div className='wrapper'>

                {/* Div que contendra el formulario */}
                <div className="form-box">

                    {/* Formulario */}
                    <form action=''>

                        <h1>Iniciar Sesion</h1>

                        <div className='input-box'>
                            <input type='email' placeholder='Correo' required/>
                            <HiOutlineMail className='icon' />
                        </div>

                        <div className='input-box'>
                            <input type='password' placeholder='Clave' required/>
                            <MdPassword className='icon' />
                        </div>

                        <div className='forgot'>
                            <a href='#'>Olvide la contraseña</a>
                        </div>

                        <button type='submit'>Ingresar</button>
                    </form>

                    {/* div de crear cuenta */}
                    <div className='register-link'><p>No tengo una cuenta</p><button className='btn-reg'onClick={() => navigate('/registro')}>Registrarme</button></div>
                    <div className='register-link'><button className='btn-reg'onClick={() => navigate('/')}>Regresar</button></div>
                </div>
            </div>
        </div>
    )
}

export default Login
