import React from 'react'

//Logos Importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
const Login = ({setAuth}) => {

    const navigate = useNavigate()

    const [usuario,setUsuario] = useState(
        {
            correo: '',
            clave: ''
        }
    );

    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh

        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify(usuario), //Para que lo detecte como string
            headers: {'Content-Type': "application/json"} // Para que rellene los campos
        });

        const data = await res.json();

        if(data.llave){
            localStorage.setItem("token",data.llave);
            localStorage.setItem("rol",data.rol);
            setAuth(true);
            toast.success("Inicio Sesion EXITOSO");
        }else{
            setAuth(false);
            toast.error(data);
            console.log(data);
        }

        // if(data == "ACCESSO PERMITIDO"){
        //     console.log('Permitido')
        //     setAuth(true);
        //     //navigate('/');
        // }
        //navigate('/')
    };

    const handleChange = e =>{
        //console.log(e.target.name, e.target.value);
        setUsuario({...usuario, [e.target.name]: e.target.value});
    };

    return (

        //logins es mi body para poder ajustar la ventana de inicio de sesion
        <div className='logins flex'>

            {/* Div que contendra el inicio de sesion */}
            <div className='wrapper'>

                {/* Div que contendra el formulario */}
                <div className="form-box">

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>

                        <h1>Iniciar Sesion</h1>

                        <div className='input-box'>
                            <input type='email' placeholder='Correo' required name='correo' onChange={handleChange}/>
                            <HiOutlineMail className='icon' />
                        </div>

                        <div className='input-box'>
                            <input type='password' placeholder='Clave' required name='clave' onChange={handleChange}/>
                            <MdPassword className='icon' />
                        </div>

                        <div className='forgot flex'>
                            <a href='#'>Olvide la contraseña</a>
                        </div>

                        <button type='submit'>Ingresar</button>
                    </form>

                    {/* div de crear cuenta */}
                    <div className='register-link flex'><p>No tengo una cuenta</p><button type='submit' className='btn-reg'onClick={() => navigate('/registro')}>Registrarme</button></div>
                    <div className='register-link flex'><button className='btn-reg'onClick={() => navigate('/')}>Regresar</button></div>
                </div>
            </div>
        </div>
    )
}

export default Login
