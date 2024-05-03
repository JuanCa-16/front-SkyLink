import React from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaUser } from "react-icons/fa";

import video from '../recursos/video.mp4';
import avion2 from '../recursos/avion2.png';
const Principal = () => {

    return (
        <div className="containerPrincipal">

            {/* <div className="principal-izq">

                <h1>Reserva tu vuelo</h1>
                <p>Selecciona una clase y los datos de tu vuelo.</p>

                <div className="busqueda">

                    <form action="">

                        <div className="globalRadio">
                            <div className="radioClases">
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc1"/>
                                <label className="radioLabel" for="opc1"><h3>Economy</h3><p>Clase Turista</p></label>
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc2"/>
                                <label className="radioLabel" for="opc2"><h3>Business</h3><p>Clase Ejecutiva</p></label>
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc3"/>
                                <label className="radioLabel" for="opc3"><h3>First Class</h3><p>Primera Clase</p></label>
                            </div>
                        </div>

                        <div className="globalBox">
                            <div className='input-box'>
                                <div className="icon"><FaPlaneDeparture /></div>
                                <input type='text' placeholder='Aeropuerto Origen' required name='aeroOrigen'/>
                            </div>

                            <div className='input-box'>
                                <div className="icon"><FaPlaneArrival /></div>
                                <input type='text' placeholder='Aeropuerto Destino' required name='aeroOrigen'/>
                            </div>

                            <div className='input-box-fecha'>
                                <p>Fecha de Ida</p>
                                <input type='date' required name='fecha'/>
                            </div>

                            <div className='input-box-fecha'>
                                <p>Fecha de Regreso</p>
                                <input type='date' required name='fecha'/>
                            </div>

                            <div className='input-box ult'>
                                <div className="icon"><FaUser/></div>
                                <input type='number' min={1} max={5} placeholder='Cantidad Pasajeros' required name='aeroOrigen'/>
                            </div>
                        </div>

                        <div className='enviar'>
                            <button className='btn-env'>Buscar</button>
                        </div>
                    </form>
                </div>
            </div> */}

            <div className="principal-der">
                <div className="otro">
                    <div className='mainText'>
                        <h1>Linking flies, linking lifes...</h1>
                    </div>

                    <div className='homeImages flex'>

                        <div className='videoDiv'>
                            <video src={video} autoPlay muted loop className='video'></video>
                        </div>

                    <img src={avion2} className='plane' alt='Avion' />

                </div>
                </div>
            </div>

            <div className="principal-izq">

                <h1>Reserva tu vuelo</h1>
                <p>Selecciona una clase y los datos de tu vuelo.</p>

                <div className="busqueda">

                    <form action="">

                        <div className="globalRadio">
                            <div className="radioClases">
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc1"/>
                                <label className="radioLabel" for="opc1"><h3>Economy</h3><p>Clase Turista</p></label>
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc2"/>
                                <label className="radioLabel" for="opc2"><h3>Business</h3><p>Clase Ejecutiva</p></label>
                                <input className="radioInput" type="radio" value="Economica"name="misClases" id="opc3"/>
                                <label className="radioLabel" for="opc3"><h3>First Class</h3><p>Primera Clase</p></label>
                            </div>
                        </div>

                        <div className="globalBox">
                            <div className='input-box'>
                                <div className="icon"><FaPlaneDeparture /></div>
                                <input type='text' placeholder='Aeropuerto Origen' required name='aeroOrigen'/>
                            </div>

                            <div className='input-box'>
                                <div className="icon"><FaPlaneArrival /></div>
                                <input type='text' placeholder='Aeropuerto Destino' required name='aeroOrigen'/>
                            </div>

                            <div className='input-box-fecha'>
                                <p>Fecha de Ida</p>
                                <input type='date' required name='fecha'/>
                            </div>

                            <div className='input-box-fecha'>
                                <p>Fecha de Regreso</p>
                                <input type='date' required name='fecha'/>
                            </div>

                            <div className='input-box ult'>
                                <div className="icon"><FaUser/></div>
                                <input type='number' min={1} max={5} placeholder='Cantidad Pasajeros' required name='aeroOrigen'/>
                            </div>
                        </div>

                        <div className='enviar'>
                            <button className='btn-env'>Buscar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Principal;
