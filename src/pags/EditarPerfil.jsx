import React from 'react'

import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { GoMilestone } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {

    const navigate = useNavigate()
    return (
    <div className='editPerfil flex'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-perfil flex'>
                <form>
                    <h1>Perfil Usuario SkyLink</h1>

                    {/* div que contendra el formulario */}
                    <div className='wrapper-editar'>

                        {/* div del formulario izq */}
                        <div className="form-box-editar">

                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Nombre</p>
                                    <input type='text' placeholder='Nombre' required name='nombre'/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Documento</p>
                                    <input type='text'  value='1234' readOnly name='id'/>
                                    <PiIdentificationBadge className='icon-edit dis' />
                                </div>

                                <div className='input-box-edit'>
                                    <p>Correo</p>
                                    <input type='email' placeholder='Correo' required name='correo'/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>
                            </div>
                        </div>

                        {/* div del formulario centro */}
                        <div className="form-box-editar">

                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Apellido</p>
                                    <input type='text' placeholder='Apellidos' required name='apellidos'/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Fecha de Nacimiento</p>
                                    <input type='date' readOnly value="2023-12-31" name='fecha'/>
                                </div>

                                <div className='input-box-edit'>
                                    <p>Clave</p>
                                    <input type='password' placeholder='Clave' required name='clave'/>
                                    <MdPassword className='icon-edit' />
                                </div>
                                
                            </div>
                        </div>

                        {/* div de la derecha */}
                        <div className="form-box-editar">
                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Telefono</p>
                                    <input type='text' placeholder='Telefono' required name='telefono'/>
                                    <AiOutlinePhone className='icon-edit' />
                                </div>

                                <div className='input-box-edit arriba'>
                                    <p>Pais</p>
                                    <input type='text' placeholder='Pais' required name='pais'/>
                                    <FaLocationDot className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Millas</p>
                                    <input type='text' readOnly value='12'name='millas'/>
                                    <GoMilestone className='icon-edit dis' />
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='flex btn-editar'><button type='submit'>Guardar Datos</button></div>
                </form>

                {/* div para regeresar a inicio */}
                <div className='regresar flex'><p>Deseo</p> <button onClick={() => navigate('/acceso')}>Regresar</button></div>
                
            </div>
        </div>
    )
}

export default EditarPerfil
