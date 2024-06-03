import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Asientos = () => {

    const navigate = useNavigate();

    // Obtiene el estado pasado desde el componente anterior
    const location = useLocation();
    const { v, cantAsi } = location.state || {}; // Desestructurando el estado pasado
    const cantidadAsientos = cantAsi; // Variable que controla la cantidad de asientos que se pueden seleccionar
    const [selectedSeats, setSelectedSeats] = useState([]); // Estado para los asientos seleccionados
    const [occupiedSeats, setOccupiedSeats] = useState([]); // Estado para los asientos ocupados

    //useEffect se utiliza para cargar los datos iniciales de los asientos ocupados desde el backend
    useEffect(() => {

        const loadInitialData = async () => {

            try {
                const res = await fetch(`http://localhost:4000/asientosvuelo/${v.id_vuelo}`, {
                    method: 'GET',
                    headers: { 'Content-Type': "application/json" }
                });
                const data = await res.json();

                // Transforma los datos obtenidos para obtener una lista de asientos ocupados
                const occupiedSeatNumbers = data.map(item => item.numero_asiento);
                setOccupiedSeats(occupiedSeatNumbers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadInitialData(); // Llama a la función para cargar los datos iniciales
    }, []);

    // Función para manejar la selección y deselección de asientos
    const toggleSeat = (rowIndex, seatIndex) => {
        const seat = `${rowIndex}-${seatIndex}`;// Identificador único para cada asiento

        // Verifica si el asiento está ocupado
        if (occupiedSeats.includes(seat)) {
            toast.error("Este asiento ya está ocupado.")
            return; // Si el asiento está ocupado, no hace nada
        }

        const seatIndexInArray = selectedSeats.indexOf(seat); // Verifica si el asiento ya está seleccionado
        console.log('aqui' + seatIndexInArray)

        // Añade el asiento a la selección si no está ya seleccionado y no se ha alcanzado el límite
        //Retorna -1 porque al no estar seleccionado u ocupado todavia, no encuentra ese asiento en el array.
        if (seatIndexInArray === -1 && selectedSeats.length < cantidadAsientos) {
            setSelectedSeats([...selectedSeats, seat]);

            //Para deseleccionar el asiento que escogi
        } else if (seatIndexInArray !== -1) {
            const updatedSeats = [...selectedSeats]; //Clona el arreglo
            updatedSeats.splice(seatIndexInArray, 1); //Elimina el Seleccionado
            setSelectedSeats(updatedSeats); //Actualiza
        } else {
            toast.error("Ya has seleccionado el máximo de asientos.")
        }
    };

    // Maneja el clic en el botón "Escoger" para enviar la selección al backend
    const handleEscogerClick = async () => {
        if (selectedSeats.length == cantidadAsientos) { //Verifica que se hayan seleccionado la cantidad correcta de asientos
            //console.log("Asientos seleccionados:", selectedSeats);

            const body = JSON.stringify({
                idVuelo: v.id_vuelo,
                asientos: selectedSeats
            });

            try {

                const res = await fetch('http://localhost:4000/ocuparasientos', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (res.ok) {
                    const responseData = await res.json();
                    console.log('Respuesta del servidor:', responseData);
                    toast.success('Asientos seleccionados correctamente');
                    navigate('/paseabordaje', { state: { v, selectedSeats, cantAsi } })

                } else {
                    const errorData = await res.json();
                    console.error('Error en la selección de asientos:', errorData);
                    toast.error('Hubo un problema al seleccionar los asientos');
                }
            } catch (error) {
                // Manejar errores de red u otros errores de la petición
                console.error('Error en la petición:', error);
                toast.error('Error al comunicarse con el servidor');
            }
        } else {
            toast.error(`Debes seleccionar ${cantidadAsientos} asientos.`)
        }
    };

    return (
        <div className='bodyAsientos'>
            <ul className='showcase'>
                <li>
                    <div className="seat"></div>
                    <small>Disponible</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>Seleccionado</small>
                </li>
                <li>
                    <div className="seat sold"></div>
                    <small>Ocupado</small>
                </li>
            </ul>

            <div className="container">
                {Array.from({ length: 10 }, (_, rowIndex) => (
                    <div className="row" key={`row-${rowIndex}`}>
                        {Array.from({ length: 6 }, (_, seatIndex) => (
                            <div
                                className={`seat ${selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''} ${occupiedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'sold' : ''}`}
                                key={`seat-${rowIndex}-${seatIndex}`}
                                onClick={() => toggleSeat(rowIndex, seatIndex)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            <p className='text'> Asientos a seleccionar: <span id='count'>{cantAsi}</span> Seleccionados: <span id='count'>{selectedSeats.length}</span></p>

            <div className="botones">
                <button className='btn' onClick={() => navigate('/busqueda')}>Regresar</button>
                <button className='btn' onClick={handleEscogerClick}>Escoger</button>
            </div>
        </div>
    );
};

export default Asientos;
