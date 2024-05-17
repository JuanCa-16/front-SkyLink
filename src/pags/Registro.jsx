import React from 'react'
import Select from 'react-select';
import {useState, useEffect} from 'react'
//Iconos importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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

    //Para manejar el pais de la API REST de Countries con SELECT
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const countryOptions = data.map(country => ({
                value: country.cca2, // Country code
                label: country.name.common // Country name
            }));
            setCountries(countryOptions);
        };

        fetchCountries();
    }, []);

    //Manejo del formulario, envia la peticion al dar click en el boton del form
    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh


        // Formatear los nombres antes de enviarlos
        usuario.nombre = formatName(usuario.nombre);
        usuario.apellidos = formatName(usuario.apellidos);

        console.log(usuario.nombre);
        console.log(usuario.apellidos);
        console.log(usuario.id);

        const res = await fetch('http://localhost:4000/usuarios', {
            method: 'POST',
            body: JSON.stringify(usuario), //Para que lo detecte como string
            headers: {'Content-Type': "application/json"} // Para que rellene los campos
        });

        const data = await res.json()

        if(data.token){
            localStorage.setItem("token",data.token);
            localStorage.setItem("rol",data.rol);
            toast.success("Registro Exitoso")
            setAuth(true);

        }else{
            setAuth(false);
            console.log(data);
            toast.error(data)

        }

    };

         // Formatear el nombre para que la primera letra sea mayúscula
         const formatName = (name) => {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        };


    //ir actualizando el json usuario a enviar en la peticion
    const handleChange = e =>{

        const { name, value } = e.target;

        //console.log(e.target.name, e.target.value);
        setUsuario({...usuario, [name]: value });

    };

    //Manejar el cambio de la seleccion del pais
    const handleCountryChange = (selectedOption) => {
        setUsuario({ ...usuario, pais: selectedOption.value });
    };

    //Estilos del SELECT
    const customStyles = {
        container: (base) => ({
            ...base,
            position: 'relative',
            width: '80%',
            border:'0',
            height: '100%',
            margin: '30px 0',
            borderRadius:'0',
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
            borderRadius:'0',
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
            borderRadius:'0',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'white',
            color: 'white',
            borderRadius:'0',
        }),
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isFocused ? '#eee' : isSelected ? '#ddd' : 'white',
            color: 'black',
            height: '20%'
        })
    };

    return (
        //Div de la pantalla Principal
        <div className='registros flex'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-r flex'>
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
                                    <input type='text' placeholder='Numero de Documento' required name='id' inputMode="numeric" pattern="\d*" onChange={handleChange}/>
                                    <PiIdentificationBadge className='icon-r' />
                                </div>

                                <div className='input-box-r'>
                                    <input type='email' placeholder='Correo' required name='correo'onChange={handleChange}/>
                                    <HiOutlineMail className='icon-r' />
                                </div>

                                <div className='input-box-r'>
                                    <input type='text' placeholder='Telefono' required name='telefono' inputMode="numeric" pattern="\d*" onChange={handleChange}/>
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

                                <div className='input-box-fecha-r flex'>
                                    <p>Fecha de Nacimiento</p>
                                    <input type='date' required name='fecha'onChange={handleChange}/>
                                </div>

                                <div className='input-box-r'>
                                    <input type='password' placeholder='Clave' required name='clave'onChange={handleChange}/>
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
