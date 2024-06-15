import React from 'react'
import { useState, useEffect } from 'react'

//Iconos importados
import Select from 'react-select';
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CrearEmp = () => {

    // Obtiene el rol del usuario almacenado en el almacenamiento local
    const rol = localStorage.getItem('rol');

    // Estado para almacenar la lista de países
    const [countries, setCountries] = useState([]);

    // Efecto para cargar la lista de países al cargar el componente
    useEffect(() => {

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

    //React Routing
    const navigate = useNavigate();

    // Estado para almacenar los datos del empleado
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

        //Acomodo los nombres y apellidos
        empleado.nombre = formatName(empleado.nombre);
        empleado.apellidos = formatName(empleado.apellidos);

        const res = await fetch(`https://login-skl.vercel.app/usuarios`, {
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

    // Formatea el nombre capitalizando la primera letra de cada palabra
    const formatName = (name) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    // Manejador de cambio en los campos del formulario
    const handleChange = e => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    // Manejador de cambio en la selección de país
    const handleCountryChange = (selectedOption) => {
        setEmpleado({ ...empleado, pais: selectedOption.value });
    };

    // Estilos personalizados para el componente Select
    const customStyles = {
        container: (base) => ({
            ...base,
            position: 'relative',
            width: '80%',
            border: '0',
            height: '100%',
            margin: '30px 0',
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
        <>
            {(rol == 3) ? (
                
                //Div de la pantalla Principal
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
                                            <input type='text' placeholder='Numero de Documento' required name='id' inputMode="numeric" pattern="\d*" onChange={handleChange} />
                                            <PiIdentificationBadge className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='email' placeholder='Correo' required name='correo' onChange={handleChange} />
                                            <HiOutlineMail className='icon-r' />
                                        </div>

                                        <div className='input-box-r'>
                                            <input type='text' placeholder='Telefono' required name='telefono' inputMode="numeric" pattern="\d*" onChange={handleChange} />
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
                                            <Select
                                                className="Selectr"
                                                options={countries}
                                                styles={customStyles}
                                                placeholder='Selecciona tu país'
                                                onChange={handleCountryChange}
                                                required
                                            />
                                            {/* <input type='text' placeholder='Pais' required name='pais' onChange={handleChange} /> */}
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
            ) : (navigate("/inicioSesion"))
            }
        </>
    )
}

export default CrearEmp
