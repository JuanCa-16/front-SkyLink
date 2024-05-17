import React, { useState, useEffect } from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaUser } from "react-icons/fa";
import Select from 'react-select'

import video from '../recursos/video.mp4';
import avion2 from '../recursos/avion2.png';
import { ToastContainer, toast } from 'react-toastify';
const BusquedaVuelos = () => {
    // Estado para almacenar el valor seleccionado

    const busqueda = JSON.parse(localStorage.getItem("busqueda"));



    const [opcionSeleccionadaSalida, setOpcionSeleccionadaSalida] = useState(busqueda.opcInicialSalida);

    // Función para manejar cambios en la selección SALIDA
    const handleSelectChangeSalida = (e) => {
        setOpcionSeleccionadaSalida(e);
        setInfoVuelo({ ...infoVuelo, aeropuertoSalida: e.value, opcInicialSalida: e });

    };

    const [opcionSeleccionadaDestino, setOpcionSeleccionadaDestino] = useState(busqueda.opcInicialLlegada);


    const handleSelectChangeDestino = (e) => {
        setOpcionSeleccionadaDestino(e);
        setInfoVuelo({ ...infoVuelo, aeropuertoLlegada: e.value, opcInicialLlegada: e });
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
    }, [])

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '40vh',
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
        aeropuertoSalida: busqueda.aeropuertoSalida,
        aeropuertoLlegada: busqueda.aeropuertoLlegada,
        fecha: busqueda.fecha,
        misClases: busqueda.misClases,
        cant: busqueda.cant,
        opcInicialSalida: busqueda.opcInicialSalida,
        opcInicialLlegada: busqueda.opcInicialLlegada
    })


    const handleChange = e => {

        setInfoVuelo({ ...infoVuelo, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //para que no recarge al darle al boton enviar evitar refresh
        localStorage.removeItem("busqueda")
        localStorage.setItem("busqueda", JSON.stringify(infoVuelo));

        try {
            const res = await fetch('http://localhost:4000/vuelos', {
                method: 'POST',
                body: JSON.stringify(infoVuelo), //Para que lo detecte como string
                headers: { 'Content-Type': "application/json" } // Para que rellene los campos
            });

            if (res.status === 404) {
                // No flights found
                setVuelos([]); // Set vuelos state to an empty array
                toast.error("LO SENTIMOS, No tenemos vuelos con estos requisitos");
                
            } else {
                // Flights found, parse response as JSON
                const data = await res.json();
                setVuelos(data);
            }
        } catch (err) {
            console.log(err.message)
        }


    }

    useEffect(() => {
        const cargarBusquedaGuardada = async () => {
            const busquedaGuardada = JSON.parse(localStorage.getItem("busqueda"));
            if (busquedaGuardada) {
                setInfoVuelo(busquedaGuardada);
                try {
                    const res = await fetch('http://localhost:4000/vuelos', {
                        method: 'POST',
                        body: JSON.stringify(busquedaGuardada), //Para que lo detecte como string
                        headers: { 'Content-Type': "application/json" } // Para que rellene los campos
                    });
        
                    if (res.status === 404) {
                        // No flights found
                        setVuelos([]); // Set vuelos state to an empty array
                        toast.error("LO SENTIMOS, No tenemos vuelos con estos requisitos");
                    } else {
                        // Flights found, parse response as JSON
                        const data = await res.json();
                        setVuelos(data);
                    }
                } catch (err) {
                    console.log(err.message)
                }
            }
        };
        cargarBusquedaGuardada();
    }, []);

    ///MANEJO DE LA LISTA DE VUELOS 
    const [vuelos, setVuelos] = useState([])



    return (
        <div className="containerPrincipal">

            <div className="general flex">
                {/* <div className="principal-1">
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
                </div> */}

                <div className="principal-2">

                    <h1 className="flex">Reserva tu vuelo</h1>
                    <p className="flex">Selecciona una clase y los datos de tu vuelo.</p>

                    <div className="busqueda flex">

                        <form onSubmit={handleSubmit}>

                            <div className="globalRadio flex">
                                <div className="radioClases flex">
                                    <input className="radioInput" type="radio" value="Economica" name="misClases" id="opc1" required onChange={handleChange} checked={(infoVuelo.misClases === "Economica")} />
                                    <label className="radioLabel" htmlFor="opc1"><h3>Economy</h3><p>Clase Turista</p></label>
                                    <input className="radioInput" type="radio" value="Ejecutiva" name="misClases" id="opc2" required onChange={handleChange} checked={infoVuelo.misClases === "Ejecutiva"} />
                                    <label className="radioLabel" htmlFor="opc2"><h3>Business</h3><p>Clase Ejecutiva</p></label>
                                    <input className="radioInput" type="radio" value="Primera" name="misClases" id="opc3" required onChange={handleChange} checked={infoVuelo.misClases === "Primera"} />
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
                                    <input type='date' required name='fecha' onChange={handleChange} value={infoVuelo.fecha} />
                                </div>

                                {/* <div className='input-box-fecha flex'>
                                  <p>Fecha de Regreso</p>
                                  <input type='date' required name='fecha' />
                              </div> 
                              
                              al de abajo le cabie la clase antes era ult*/}

                                <div className='input-box-fecha flex'>
                                    <div className="icon"><FaUser /></div>
                                    <input type='number' min={1} max={5} placeholder='Cantidad Pasajeros' required name='cant' onChange={handleChange} value={infoVuelo.cant} />
                                </div>
                            </div>

                            <div className='enviar flex'>
                                <button className='btn-env' type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>

                    <div className="vuelos flex">
                        {Array.isArray(vuelos) && vuelos.length > 0 ? (
                            vuelos.map(vuelo => (
                                <div key={vuelo.id_vuelo} className="tarjeta">
                                    <h1 className="tituloPri">Vuelo #{vuelo.id_vuelo} Avion #{vuelo.id_avion}</h1>
                                    <div className="infoVuelo">
                                        <h3 className="titulo">SALIDA:<span>{vuelo.nombre_aeropuerto_salida}</span> </h3>
                                        <h3 className="titulo">LLEGADA:<span>{vuelo.nombre_aeropuerto_llegada}</span></h3>
                                        <h3 className="titulo">CIUDAD SALIDA:<span>{vuelo.ciudad_salida}</span></h3>
                                        <h3 className="titulo">CIUDAD LLEGADA:<span>{vuelo.ciudad_llegada}</span></h3>
                                        <h3 className="titulo">FECHA:<span>{vuelo.fecha.substring(0, 10)}</span></h3>
                                        <h3 className="titulo">HORA VUELO:<span>{vuelo.hora}</span></h3>
                                        <h3 className="titulo">PRECIO:<span>$$</span></h3>
                                        <button className='btn' >Seleccionar</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>No se encontraron vuelos.</h1>
                            </div>
                        )}
                    </div>

                </div>
            </div>


        </div>
    );
}

export default BusquedaVuelos
