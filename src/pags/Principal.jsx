import React, {useState, useEffect} from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaUser } from "react-icons/fa";
//Para autocompletar al escribir en los vuelos
import Select from "react-select"

import video from '../recursos/video.mp4';
import avion2 from '../recursos/avion2.png';


const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '40px', // Deshace el borde predeterminado
        backgroundColor: 'var(--ColorGris)', // Usa la variable de CSS para el color de fondo
        '&::placeholder': {
          color: 'black', // Cambia el color del placeholder
        },
        width: '30vh'
      }),
    input: (provided) => ({
      ...provided,
      color: 'black', // Establece el color de texto
      border: 0
    }),
  };




const Principal = () => {
    // Estado para almacenar el valor seleccionado
    const [opcionSeleccionadaSalida, setOpcionSeleccionadaSalida] = useState(null);

    // Función para manejar cambios en la selección SALIDA
    const handleSelectChangeSalida = (event) => {
        setOpcionSeleccionadaSalida(event);
    };

    const [opcionSeleccionadaDestino, setOpcionSeleccionadaDestino] = useState(null);

 
    const handleSelectChangeDestino = (event) => {
        setOpcionSeleccionadaDestino(event);
    };

    //TRAER LOS AEROPUERTOS CON SU ID
  // Aquí debes hacer la llamada al API para obtener los aeropuertos
    const [aeropuertos, setAeropuertos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/aeropuertos')
        .then(response => response.json())
        .then(data => setAeropuertos(data))
        .catch(error => console.error('Error fetching aeropuertos:', error));
    }, []);


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

                        <form action="">

                            <div className="globalRadio flex" >
                                <div className="radioClases flex" >
                                    <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc1" required/>
                                    <label className="radioLabel"  htmlFor="opc1"><h3>Economy</h3><p>Clase Turista</p></label>
                                    <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc2" required/>
                                    <label className="radioLabel"  htmlFor="opc2"><h3>Business</h3><p>Clase Ejecutiva</p></label>
                                    <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc3" required/>
                                    <label className="radioLabel"  htmlFor="opc3"><h3>First Class</h3><p>Primera Clase</p></label>
                                </div>
                            </div>

                            <div className="globalBox">
                                <div className='input-box flex'>
                                    <div className="icon"><FaPlaneDeparture /></div>
                                    <Select
                                        className="Select" 
                                        id="salida"
                                        options={aeropuertos.map(aeropuerto => ({
                                            value: aeropuerto.id_aeropuerto,
                                            label: aeropuerto.nombre
                                        }))} 
                                        value={opcionSeleccionadaSalida} 
                                        onChange={handleSelectChangeSalida}
                                        placeholder="Aeropuerto Salida"
                                        required
                                        styles={customStyles}
                                    />
                                   {/* <input type='text' placeholder='Aeropuerto Origen' required name='aeroOrigen'/>*/}
                                </div>

                                <div className='input-box flex'>
                                    <div className="icon"><FaPlaneArrival /></div>
                                    <Select
                                        className="Select" 
                                        id="salida" 
                                        options={aeropuertos.map(aeropuerto => ({
                                            value: aeropuerto.id_aeropuerto,
                                            label: aeropuerto.nombre
                                        }))}
                                        value={opcionSeleccionadaDestino} 
                                        onChange={handleSelectChangeDestino}
                                        placeholder="Aeropuerto Destino"
                                        required
                                        styles={customStyles}
                                    />
                                   {/*<input type='text' placeholder='Aeropuerto Destino' required name='aeroOrigen'/>*/}
                                </div>

                                <div className='input-box-fecha flex'>
                                    <p>Fecha de Ida</p>
                                    <input type='date' required name='fecha'/>
                                </div>

                                <div className='input-box-fecha flex'>
                                    <p>Fecha de Regreso</p>
                                    <input type='date' required name='fecha'/>
                                </div>

                                <div className='input-box ult flex'>
                                    <div className="icon"><FaUser/></div>
                                    <input type='number' min={1} max={5} placeholder='Cantidad Pasajeros' required name='aeroOrigen'/>
                                </div>
                            </div>

                            <div className='enviar flex'>
                                <button className='btn-env'>Buscar</button>
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
