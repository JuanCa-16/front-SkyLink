import React, { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

//Iconos
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { GoMilestone } from "react-icons/go";

import { toast } from 'react-toastify';

const EditarPerfil = () => {

    // Estado para almacenar la lista de países
    const [countries, setCountries] = useState([]);

    useEffect(() => {

        // Función para obtener la lista de países desde una API
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const countryOptions = data.map(country => ({
                value: country.cca2, // Country code
                label: country.translations.spa.common || country.name.common // Country name
            }));

            setCountries(countryOptions);
        };

        fetchCountries();
        
    }, []);

    const navigate = useNavigate()

    const [id, setId] = useState("")

    const [usuario, setUsuario] = useState(
        {
            id: '',
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

    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true)

    //Se renderiza cada vez que cambie el ID solo 1 vez
    useEffect(() => {

         // Función para obtener los datos del usuario
        const fetchData = async () => {

            try {
                //Traer el id del usuario que esta Logueado
                const response = await fetch('http://localhost:4000/usuarioLogin', {
                    method: 'GET',
                    headers: { token: localStorage.token }
                });

                const dat = await response.json();
                setId(dat.id); //La variable id ya almacena el id del usuario a mostrar

                //Traer todo del usuario que esta Logueado
                const res = await fetch(`http://localhost:4000/usuarios/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': "application/json" }
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

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Formatear los nombres antes de enviarlos
        usuario.nombre = formatName(usuario.nombre);
        usuario.apellidos = formatName(usuario.apellidos);

        //Peticion para actulizar
        const res = await fetch(`http://localhost:4000/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(usuario), //Para que lo detecte como string
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });

        const data = await res.json()

        //Se elimina el token antiguo, se agrega el nuevo
        if (data.token) {
            localStorage.removeItem("token")
            localStorage.setItem("token", data.token);
            toast.success("Informacion De Perfil Actualizada");
            navigate('/')
        } else {
            console.log(data);
            toast.error(data);
        }

    };

    // Formatear el nombre para que la primera letra sea mayúscula
    const formatName = (name) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    // Función para manejar cambios en los inputs
    const handleChange = e => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    //Manejar el cambio de la seleccion del pais
    const handleCountryChange = (selectedOption) => {
        setUsuario({ ...usuario, pais: selectedOption.value });
    };

    // Estilos personalizados para el componente Select
    const customStyles = {
        container: (base) => ({
            ...base,
            position: 'relative',
            //width: '80%',
            border: '0',
            height: '100%',
            //margin: '30px 0',
            borderRadius: '0',
        }),
        control: (provided) => ({
            ...provided,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            outline: 'none',
            borderRadius: '40px',
            fontSize: '16px',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, .1)',
            paddingLeft: '0.8rem',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0 20px',
            borderRadius: '0',
            color: 'white',
            border: '0'
        }),
        input: (base) => ({
            ...base,
            width: '100%',
            margin: 'none !important',
            borderRadius: 0,
            color: 'white',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'white', // Establece el color del placeholder a blanco
        }),
        singleValue: (base) => ({
            ...base,
            color: 'white',
            borderRadius: '0',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'white',
            color: 'white',
            borderRadius: '0',
        }),
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isFocused ? '#eee' : isSelected ? '#ddd' : 'white',
            color: 'black',
            height: '20%'
        })
    };

    return (
        <div className='editPerfil flex'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-perfil flex'>

                {loading ? (
                    <>
                        <p>cargando...</p>
                        {/* {toast.success("hola")} */}
                    </>
                ) : (
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
                                            <input type='text' value={usuario.nombre} required name='nombre' onChange={handleChange} />
                                            <HiOutlineMail className='icon-edit' />
                                        </div>

                                        <div className='input-box-edit'>
                                            <p className='dis'>Documento</p>
                                            <input type='text' value={usuario.id} readOnly name='id' onChange={handleChange} />
                                            <PiIdentificationBadge className='icon-edit dis' />
                                        </div>

                                        <div className='input-box-edit'>
                                            <p>Correo</p>
                                            <input type='email' value={usuario.correo} required name='correo' onChange={handleChange} />
                                            <HiOutlineMail className='icon-edit' />
                                        </div>
                                    </div>
                                </div>

                                {/* div del formulario centro */}
                                <div className="form-box-editar">

                                    <div className='form'>

                                        <div className='input-box-edit'>
                                            <p>Apellido</p>
                                            <input type='text' value={usuario.apellidos} required name='apellidos' onChange={handleChange} />
                                            <HiOutlineMail className='icon-edit' />
                                        </div>

                                        <div className='input-box-edit'>
                                            <p className='dis'>Fecha de Nacimiento</p>
                                            <input type='date' readOnly value={usuario.fecha} name='fecha' onChange={handleChange} />
                                        </div>

                                        <div className='input-box-edit'>
                                            <p>Clave</p>
                                            <input type='password' placeholder='Clave Nueva' required name='clave' onChange={handleChange} />
                                            <MdPassword className='icon-edit' />
                                        </div>

                                    </div>
                                </div>

                                {/* div de la derecha */}
                                <div className="form-box-editar">
                                    <div className='form'>

                                        <div className='input-box-edit'>
                                            <p>Telefono</p>
                                            <input type='text' value={usuario.telefono} required name='telefono' inputMode="numeric" pattern="\d*" onChange={handleChange} />
                                            <AiOutlinePhone className='icon-edit' />
                                        </div>

                                        <div className='input-box-edit arriba'>
                                            <p>Pais</p>
                                            <Select
                                                className="Selectr"
                                                options={countries}
                                                styles={customStyles}
                                                placeholder='Selecciona tu país'
                                                onChange={handleCountryChange}
                                                value={countries.find(country => country.value === usuario.pais)}
                                                required
                                            />
                                            {/* <input type='text' value={usuario.pais} required name='pais' onChange={handleChange}/> */}
                                            <FaLocationDot className='icon-edit' />
                                        </div>

                                        <div className='input-box-edit'>
                                            <p className='dis'>Millas</p>
                                            <input type='text' readOnly value={usuario.millas} name='millas' onChange={handleChange} />
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
