import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const VuelosAsignados = ({logueado}) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [vuelos, setVuelos] = useState([]);

    const fetchData = async () => {
        try {
            // Obtener el id del usuario que está logueado
            const response = await fetch('http://localhost:4000/usuarioLogin', {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const dat = await response.json();
            const userId = dat.id;
            setId(userId);

            // Obtener los vuelos asignados al usuario
            const vuelosResponse = await fetch(`http://localhost:4000/vuelosasignados/${userId}`, {
                method: 'GET'
            });

            const vuelosData = await vuelosResponse.json();

            if (vuelosResponse.status === 200) {
                setVuelos(vuelosData);
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Error al obtener los vuelos');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='principalvuelosasignados'>
            {(logueado)? (<>
                <h1> VUELOS ASIGNADOS</h1>
            <h1 className="total-vuelos">Total vuelos: {vuelos.length}</h1>
            <div className="vuelos flex">
                {Array.isArray(vuelos) && vuelos.length > 0 ? (
                    vuelos.map(vuelo => (
                        <div key={vuelo.id_vuelo} className="tarjeta">
                            <h1 className="tituloPri">Vuelo: {vuelo.id_vuelo} - Avion asignado: {vuelo.id_avion}</h1>
                            <div className="infoVuelo">
                                <h3 className="titulo">SALIDA:<span>{vuelo.aeropuertosalida}</span> </h3>
                                <h3 className="titulo">LLEGADA:<span>{vuelo.aeropuertollegada}</span></h3>
                                <h3 className="titulo">FECHA:<span>{vuelo.fecha.substring(0, 10)}</span></h3>
                                <h3 className="titulo">HORA VUELO:<span>{vuelo.hora}</span></h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <h1>No se encontraron vuelos.</h1>
                    </div>
                )}
            </div>
            </>):navigate("/inicioSesion")}
            
        </div>
    );
};

export default VuelosAsignados;