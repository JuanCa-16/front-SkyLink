import React from 'react'

//Logos Importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';


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

        if(data.token){
            localStorage.setItem("token",data.token);
            setAuth(true);
            toast.success("Inicio Sesion Exitoso");
        }else{
            setAuth(false);
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
        <div className='logins'>

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

                        <div className='forgot'>
                            <a href='#'>Olvide la contraseña</a>
                        </div>

                        <button type='submit'>Ingresar</button>
                    </form>

                    {/* div de crear cuenta */}
                    <div className='register-link'><p>No tengo una cuenta</p><button type='submit' className='btn-reg'onClick={() => navigate('/registro')}>Registrarme</button></div>
                    <div className='register-link'><button className='btn-reg'onClick={() => navigate('/')}>Regresar</button></div>
                </div>
            </div>
        </div>
    )
}

export default Login
