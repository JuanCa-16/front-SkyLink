import React from 'react'
import {useState} from 'react'
//Iconos importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CrearEmp = () => {

    const rol = localStorage.getItem('rol');

    //React Routing
    const navigate = useNavigate();

    const [empleado, setEmpleado] = useState(
        {
            id: '',
            rol: 2,
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
    const handleSubmit = async (e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh

        const res = await fetch('http://localhost:4000/usuarios', {
            method: 'POST',
            body: JSON.stringify(empleado), //Para que lo detecte como string
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });

        const data = await res.json()

        if (data.token) {
            toast.success("Creado Con exito")
            navigate('/')
        } else {
            toast.error(data)
        }
    };

    //ir actualizando el json usuario a enviar en la peticion
    const handleChange = e => {
        //console.log(e.target.name, e.target.value);
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    return (
        
        <>
        {(rol==3)? (//Div de la pantalla Principal
                <div className='registros flex'>
                    {/* div que contendra todo el crear cuenta */}
                    <div className='principal-r flex'>
                        <form onSubmit={handleSubmit}>
                            <h1>EMPLEADO SkyLink</h1>

                            {/* div que contendra el formulario */}
                            <div className='wrapper-r'>

                                {/* div del formulario izq */}
                                <div className="form-box-r">

                                    <div className='form'>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Nombre' required name='nombre' onChange={handleChange} />
                                            <HiOutlineMail className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Numero de Documento' required name='id' onChange={handleChange} />
                                            <PiIdentificationBadge className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='email' placeholder='Correo' required name='correo' onChange={handleChange} />
                                            <HiOutlineMail className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Telefono' required name='telefono' onChange={handleChange} />
                                            <AiOutlinePhone className='icon-r' />
                                        </div>
                                    </div>
                                </div>

                                {/* div del formulario der */}
                                <div className="form-box-r">

                                    <div className='form'>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Apellidos' required name='apellidos' onChange={handleChange} />
                                            <HiOutlineMail className='icon-r' />
                                        </div>

                                        <div className='input-box-fecha-r flex'>
                                            <p>Fecha de Nacimiento</p>
                                            <input type='date' required name='fecha' onChange={handleChange} />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='password' placeholder='Clave' required name='clave' onChange={handleChange} />
                                            <MdPassword className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Pais' required name='pais' onChange={handleChange} />
                                            <FaLocationDot className='icon-r' />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='flex btn-registro'><button type='submit'>Crear</button></div>
                        </form>

                        {/* div para regeresar a inicio */}
                        <div className='register-link-r flex'><p>Deseo </p> <button onClick={() => navigate('/')}>Regresar</button></div>

                    </div>
                </div>
        ):(navigate("/inicioSesion"))
        }
        </>
    )
}

export default CrearEmp