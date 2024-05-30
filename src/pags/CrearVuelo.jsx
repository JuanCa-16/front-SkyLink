import React from 'react'
import Select from 'react-select';
import {useState, useEffect} from 'react'
//Iconos importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaPlaneArrival, FaPlaneDeparture, FaUsers } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CrearVuelo = () => {

    //PARA TRAER LOS USUARIOS EMPLEADOS
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const cargarUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuarios', {
            method: 'GET',
            headers: { 'Content-Type': "application/json" }
        });

        const data = await res.json();
        
        // Filtrar usuarios con rol 2 o 3
        const empleados = data.filter(user => user.rol === 2 || user.rol === 3);
        
        // Mapear los datos para usarlos en react-select
        const options = empleados.map(user => ({
            value: user.id,   // id como value
            label: `${user.nombre} ${user.apellidos}` // Concatenar nombre y apellidos
        }));

        setUsuarios(options);
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);


    const [opcionSeleccionadaSalida, setOpcionSeleccionadaSalida] = useState(null);

    // Función para manejar cambios en la selección SALIDA
    const handleSelectChangeSalida = (e) => {
        setOpcionSeleccionadaSalida(e);
        setInfoVuelo({...infoVuelo, aeropuertoSalida: e.value, opcInicialSalida: e});
    };

    const [opcionSeleccionadaDestino, setOpcionSeleccionadaDestino] = useState(null);


    const handleSelectChangeDestino = (e) => {
        setOpcionSeleccionadaDestino(e);
        setInfoVuelo({...infoVuelo, aeropuertoLlegada: e.value, opcInicialLlegada: e});
    };



    const [aeropuertos, setAeropuertos] = useState([]);

    const cargarAeropuertos = async () => {
        const res = await fetch('http://localhost:4000/aeropuertos', {
            method: 'GET',
            headers: { 'Content-Type': "application/json" }
        });

        const data = await res.json()
        setAeropuertos(data)
    }

    useEffect(() => {
        cargarAeropuertos()
    },[])


    //React Routing
    const navigate = useNavigate();

    const [infoVuelo, setInfoVuelo] = useState({
        aeropuertoSalida : '',
        aeropuertoLlegada : '',
        fecha: '',
        hora:'',
        id:'',
        opcInicialSalida: '',
        opcInicialLlegada: ''
    })

    //Manejo del formulario, envia la peticion al dar click en el boton del form
    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh
        console.log(infoVuelo)
    };

    //ir actualizando el json usuario a enviar en la peticion
    const handleChange = e =>{
        //console.log(e.target.name, e.target.value);
        setInfoVuelo({...infoVuelo, [e.target.name]: e.target.value});

    };

    //Estilos del SELECT
    const customStyles = {
        container: (base) => ({
            ...base,
            position: 'relative',
            width: '400px',
            border:'0',
            height: '100%',
            margin: '15px 5px',
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
        }),

    };
    return (
        //Div de la pantalla Principal
        <div className='crearVuelo flex'>

            {/* div que contendra todo el crear cuenta */}
            <div className='principal-r flex'>
                <form onSubmit={handleSubmit}>
                    <h1>CREACION DE VUELO</h1>

                    {/* div que contendra el formulario */}
                    <div className='wrapper-r'>

                        {/* div del formulario izq */}
                        <div className="form-box-r">

                            <div className='form'>

                            <div className='input-box flex'>
                                    <div className="icon"><FaPlaneDeparture /></div>
                                    {/* <input type='text' placeholder='Aeropuerto Origen' required name='aeroOrigen' /> */}
                                    <Select
                                        className="Select"
                                        id="salida"
                                        options={aeropuertos.map(aeropuerto => ({
                                            value: aeropuerto.id_aeropuerto,
                                            label: aeropuerto.nombre + " - " + aeropuerto.ciudad
                                        }))} 
                                        value={opcionSeleccionadaSalida}
                                        name="aeropuertoSalida"
                                        onChange={handleSelectChangeSalida}
                                        placeholder="Aeropuerto Salida"
                                        styles={customStyles}
                                        required
                                    />
                                </div>

                                <div className='input-box flex'>
                                    <div className="icon"><FaPlaneArrival /></div>
                                    {/* <input type='text' placeholder='Aeropuerto Destino' required name='aeroOrigen' /> */}
                                    <Select
                                        className="Select"
                                        id="salida"
                                        options={aeropuertos.map(aeropuerto => ({
                                            value: aeropuerto.id_aeropuerto,
                                            label: aeropuerto.nombre + " - " + aeropuerto.ciudad
                                        }))} 
                                        value={opcionSeleccionadaDestino}
                                        name="aeropuertoLlegada"
                                        onChange={handleSelectChangeDestino}
                                        placeholder="Aeropuerto Destino"
                                        styles={customStyles}
                                        required
                                    />
                                </div>

                                <div className='input-box-fecha-r flex'>
                                    <p>Fecha del Vuelo</p>
                                    <input type='date' required name='fecha'onChange={handleChange}/>
                                </div>

                                <div className='input-box-fecha-r flex'>
                                    <p>Hora del Vuelo</p>
                                    <input type='time' required name='hora'onChange={handleChange}/>
                                </div>

                                <div className='input-box-fecha-r flex'>
                
                                    <input type='number' min={1} max={4} placeholder='Numero Avion' required name='id' onChange={handleChange}/>
                                </div>

                                <div className='input-box flex'>
                                    <div className="icon"><FaUsers /></div>
                                    {/* <input type='text' placeholder='Aeropuerto Destino' required name='aeroOrigen' /> */}
                                    <Select
                                        isMulti
                                        options={usuarios}
                                        value={selectedUsers}
                                        onChange={setSelectedUsers}
                                        placeholder="Usuario/s encargados"
                                        styles={customStyles}
                                        required
                                    />
                                </div>

                            </div>
                        </div>


                    </div>

                    <div className='flex btn-registro'><button type='submit'>Crear</button></div>
                </form>

                {/* div para regeresar a inicio */}
                <div className='register-link-r flex'><p>Deseo</p> <button onClick={() => navigate('/')}>Regresar</button></div>
                
            </div>
        </div>
    )
}

export default CrearVuelo
