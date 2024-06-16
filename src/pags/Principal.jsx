import React, { useState, useEffect } from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaUser } from "react-icons/fa";
import Select from 'react-select'
import { toast } from 'react-toastify';
import video from '../recursos/video.mp4';
import avion2 from '../recursos/avion2.png';
import {Link, useNavigate} from 'react-router-dom';
const Principal = () => {
    const navigate = useNavigate()
    // Estado para almacenar el valor seleccionado
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
        const res = await fetch(`https://login-skl.vercel.app/aeropuertos`, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" }
        });

        const data = await res.json()
        setAeropuertos(data)
    }

    useEffect(() => {
        // Verificar si hay una búsqueda almacenada en el Local Storage
        const busqueda = JSON.parse(localStorage.getItem("busqueda"));
        if (busqueda) {
            // Eliminar la búsqueda al regresar a la página principal
            localStorage.removeItem("busqueda");
        }
    }, []);

    useEffect(() => {
        cargarAeropuertos()
    },[])

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '50vh',
            height: '30%',
            backgroundColor: '#cec9c9;',
            border: 'none',
            outline: 'none',
            borderRadius: '40px',
            fontSize: '16px',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, .1)',
            paddingLeft: '0.8rem',
        }),
        input: (provided) => ({
            ...provided,
            border: '0',
            color: 'black',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    const [infoVuelo, setInfoVuelo] = useState({
        aeropuertoSalida : '',
        aeropuertoLlegada : '',
        fecha: '',
        misClases: '',
        cant: '',
        opcInicialSalida: '',
        opcInicialLlegada: ''
    })
    const handleSubmit = async(e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh

        if (!infoVuelo.misClases) {
            console.log('Debe seleccionar una clase de vuelo.');
            toast.error('Debe seleccionar una clase de vuelo.');
            return;
        }

        //console.log(infoVuelo);
        localStorage.setItem("busqueda",JSON.stringify(infoVuelo));
        
        navigate('/busqueda')
        
    }

    const handleChange = e =>{

        setInfoVuelo({...infoVuelo, [e.target.name]: e.target.value});

    };

    return (
        <div className="containerPrincipal">

            <div className="general flex">
                <div className="principal-1">
                    <div className="otro">
                        <div className='mainText'>
                            <h1>Linking flies, linking lifes...</h1>
                        </div>

                        <div className='homeImages'>

                            <div className='videoDiv'>
                                <video src={video} autoPlay muted loop className='video'></video>
                            </div>

                            <img src={avion2} className='plane' alt='Avion' />

                        </div>
                    </div>
                </div>

                <div className="principal-2">

                    <h1 className="flex">Reserva tu vuelo</h1>
                    <p className="flex">Selecciona una clase y los datos de tu vuelo.</p>

                    <div className="busqueda flex">

                        <form onSubmit={handleSubmit}>

                            <div className="globalRadio flex">
                                <div className="radioClases flex">
                                    <input className="radioInput" type="radio" value="Economica" name="misClases" id="opc1"  onChange={handleChange} />
                                    <label className="radioLabel" htmlFor="opc1"><h3>Economy</h3><p>Clase Turista</p></label>
                                    <input className="radioInput" type="radio" value="Ejecutiva" name="misClases" id="opc2"  onChange={handleChange}/>
                                    <label className="radioLabel" htmlFor="opc2"><h3>Business</h3><p>Clase Ejecutiva</p></label>
                                    <input className="radioInput" type="radio" value="Primera" name="misClases" id="opc3"  onChange={handleChange}/>
                                    <label className="radioLabel" htmlFor="opc3"><h3>First Class</h3><p>Primera Clase</p></label>
                                </div>
                            </div>

                            <div className="globalBox">
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

                                <div className='input-box-fecha flex'>
                                    <p>Fecha de Ida</p>
                                    <input type='date' required name='fecha' onChange={handleChange}/>
                                </div>

                                {/* <div className='input-box-fecha flex'>
                                    <p>Fecha de Regreso</p>
                                    <input type='date' required name='fecha' />
                                </div> 
                                
                                al de abajo le cabie la clase antes era ult*/}

                                <div className='input-box-fecha flex'>
                                    <div className="icon"><FaUser /></div>
                                    <input type='number' min={1} max={5} placeholder='Cantidad Pasajeros' required name='cant' onChange={handleChange}/>
                                </div>
                            </div>

                            <div className='enviar flex'>
                                <button className='btn-env' type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='info flex'>

                <div className="box flex">
                    <h2>Reserva fácil y rápida de vuelos</h2>
                    <p>Con nuestra aplicación, reservar vuelos es
                        simple y conveniente. Explore una amplia gama de opciones y reserve
                        su vuelo perfecto en solo unos pocos clics</p>
                </div>

                <div className="box flex">
                    <h2>Información de vuelos en tiempo real</h2>
                    <p>Manténgase informado sobre el estado de su vuelo, horarios de salida,
                        llegadas y más, para una experiencia de viaje sin preocupaciones desde el
                        principio hasta el final</p>
                </div>

                <div className="box flex">
                    <h2>Gestione sus reservas en cualquier momento</h2>
                    <p>Modifique fechas, seleccione asientos y realice el check-in en
                        línea con facilidad. Nuestra aplicación le da el control total sobre
                        su viaje, adaptándose a sus necesidades</p>
                </div>


            </div>

        </div>
    );
};

export default Principal;
