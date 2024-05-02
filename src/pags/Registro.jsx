import React from 'react'
import {useState} from 'react'
//Iconos importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import {useNavigate} from 'react-router-dom';

const Registro = ({setAuth}) => {

    //React Routing
    const navigate = useNavigate();

    const [usuario,setUsuario] = useState(
        {
            id: '',
            rol: 1,
            nombre: '',
            apellidos: '',
            correo: '',
            clave: '',
            telefono: '',
            fecha: '',
            pais: ''
        }
    );

    //Manejo del formulario, envia la peticion al dar click en el boton del form
    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh

        const res = await fetch('http://localhost:4000/usuarios', {
            method: 'POST',
            body: JSON.stringify(usuario), //Para que lo detecte como string
            headers: {'Content-Type': "application/json"} // Para que rellene los campos
        });

        const data = await res.json()
        console.log(data)

        if(data.token){
            localStorage.setItem("token",data.token);
            setAuth(true);

        }else{
            setAuth(false);
            console.log(data);
        }

    };

    //ir actualizando el json usuario a enviar en la peticion
    const handleChange = e =>{
        //console.log(e.target.name, e.target.value);
        setUsuario({...usuario, [e.target.name]: e.target.value});
    };

    return (
        //Div de la pantalla Principal
        <div className='registros'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-r'>
                <form onSubmit={handleSubmit}>
                    <h1>Registro SkyLink</h1>

                    {/* div que contendra el formulario */}
                    <div className='wrapper-r'>

                        {/* div del formulario izq */}
                        <div className="form-box-r">

                            <div className='form'>

                                <div className='input-box-r'>
                                    <input type='text' placeholder='Nombre' required name='nombre'onChange={handleChange}/>
                                    <HiOutlineMail className='icon-r' />
                                </div>

                                <div className='input-box-r'>
                                    <input type='text' placeholder='Numero de Documento' required name='id'onChange={handleChange}/>
                                    <PiIdentificationBadge className='icon-r' />
                                </div>

                                <div className='input-box-r'>
                                    <input type='email' placeholder='Correo' required name='correo'onChange={handleChange}/>
                                    <HiOutlineMail className='icon-r' />
                                </div>

                                <div className='input-box-r'>
                                    <input type='text' placeholder='Telefono' required name='telefono'onChange={handleChange}/>
                                    <AiOutlinePhone className='icon-r' />
                                </div>
                            </div>
                        </div>

                        {/* div del formulario der */}
                        <div className="form-box-r">

                            <div className='form'>

                                <div className='input-box-r'>
                                    <input type='text' placeholder='Apellidos' required name='apellidos'onChange={handleChange}/>
                                    <HiOutlineMail className='icon-r' />
                                </div>

                                <div className='input-box-fecha-r'>
                                    <p>Fecha de Nacimiento</p>
                                    <input type='date' required name='fecha'onChange={handleChange}/>
                                </div>

                                <div className='input-box-r'>
                                    <input type='password' placeholder='Clave' required name='clave'onChange={handleChange}/>
                                    <MdPassword className='icon-r' />
                                </div>
                                
                                <div className='input-box-r'>
                                    <input type='text' placeholder='Pais' required name='pais'onChange={handleChange}/>
                                    <FaLocationDot className='icon-r' />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='flex btn-registro'><button type='submit'>Registrame</button></div>
                </form>

                {/* div para regeresar a inicio */}
                <div className='register-link-r flex'><p>Ya tengo una cuenta </p> <button onClick={() => navigate('/inicioSesion')}>Iniciar Sesion</button></div>
                
            </div>
        </div>
    )
}

export default Registro
