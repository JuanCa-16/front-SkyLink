import React, { useEffect } from 'react'
import {useState} from 'react'


import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { GoMilestone } from "react-icons/go";
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const EditarPerfil = () => {

    const navigate = useNavigate()


    const[id,setId] = useState("")

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
            pais: '',
            millas: ''
        }
    );

    const [loading, setLoading] = useState(true)

    //Se renderiza cada vez que cambie el ID solo 1 vez
    useEffect(() => {

        const fetchData = async () => {

            try {

                //Traer el id del usuario que esta Logueado
                const response = await fetch('http://localhost:4000/usuarioLogin', {
                    method: 'GET',
                    headers: {token: localStorage.token}
                });
    
                const dat = await response.json();
                setId(dat.id); //La variable id ya almacena el id del usuario a mostrar

                //Traer todo del usuario que esta Logueado
                const res = await fetch(`http://localhost:4000/usuarios/${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': "application/json"}
                });

                //Se asigna a usuario los datos actuales
                const data = await res.json();
                setUsuario({
                    id: data.id,
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    correo: data.correo,
                    fecha: data.fecha.substring(0, 10),
                    telefono: data.telefono,
                    pais: data.pais,
                    millas: data.millas
                }); //Actualiza el Usuario

                //la carga termina
                setLoading(false); // Marcamos la carga como completada
            } catch (error) {
                console.error(error.message);
                setLoading(false); // En caso de error, también marcamos la carga como completada
            }
        };
    
        fetchData();

    }, [id]); 

    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh

        //Peticion para actulizar
        const res = await fetch(`http://localhost:4000/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(usuario), //Para que lo detecte como string
            headers: {'Content-Type': "application/json"} // Para que rellene los campos
        });

        const data = await res.json()

        //Se elimina el token antiguo, se agrega el nuevo
        if(data.token){
            localStorage.removeItem("token")
            localStorage.setItem("token",data.token);
            toast.success("Informacion De Perfil Actualizada");
            navigate('/')
        }else{
            console.log(data);
            toast.error(data);
        }

    };

    const handleChange = e =>{
        //console.log(e.target.name, e.target.value);
        setUsuario({...usuario, [e.target.name]: e.target.value});

    };

    return (
        <div className='editPerfil flex'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-perfil flex'>
                
                {loading ?(
                    <>
                    <p>cargando...</p> 
                    {/* {toast.success("hola")} */}
                    </>
                ):(
                    <>
                    <form onSubmit={handleSubmit}>
                    <h1>Perfil Usuario SkyLink</h1>

                    {/* div que contendra el formulario */}
                    <div className='wrapper-editar'>

                        {/* div del formulario izq */}
                        <div className="form-box-editar">

                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Nombre</p>
                                    <input type='text' value={usuario.nombre} required name='nombre' onChange={handleChange}/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Documento</p>
                                    <input type='text'  value={usuario.id} readOnly name='id' onChange={handleChange}/>
                                    <PiIdentificationBadge className='icon-edit dis' />
                                </div>

                                <div className='input-box-edit'>
                                    <p>Correo</p>
                                    <input type='email' value={usuario.correo} required name='correo' onChange={handleChange}/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>
                            </div>
                        </div>

                        {/* div del formulario centro */}
                        <div className="form-box-editar">

                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Apellido</p>
                                    <input type='text' value={usuario.apellidos} required name='apellidos' onChange={handleChange}/>
                                    <HiOutlineMail className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Fecha de Nacimiento</p>
                                    <input type='date' readOnly value={usuario.fecha}  name='fecha' onChange={handleChange}/>
                                </div>

                                <div className='input-box-edit'>
                                    <p>Clave</p>
                                    <input type='password' placeholder='Clave Nueva' required name='clave' onChange={handleChange}/>
                                    <MdPassword className='icon-edit' />
                                </div>
                                
                            </div>
                        </div>

                        {/* div de la derecha */}
                        <div className="form-box-editar">
                            <div className='form'>

                                <div className='input-box-edit'>
                                    <p>Telefono</p>
                                    <input type='text' value={usuario.telefono} required name='telefono' onChange={handleChange}/>
                                    <AiOutlinePhone className='icon-edit' />
                                </div>

                                <div className='input-box-edit arriba'>
                                    <p>Pais</p>
                                    <input type='text' value={usuario.pais} required name='pais' onChange={handleChange}/>
                                    <FaLocationDot className='icon-edit' />
                                </div>

                                <div className='input-box-edit'>
                                    <p className='dis'>Millas</p>
                                    <input type='text' readOnly value={usuario.millas}name='millas' onChange={handleChange}/>
                                    <GoMilestone className='icon-edit dis' />
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='flex btn-editar'><button type='submit'>Guardar Datos</button></div>
                </form>

                {/* div para regeresar a inicio */}
                <div className='regresar flex'><p>Deseo</p> <button onClick={() => navigate('/')}>Regresar</button></div>
                
                    </>
                )}

            </div>
        </div>
    )
}

export default EditarPerfil
