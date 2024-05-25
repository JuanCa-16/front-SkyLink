import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Asientos = () => {

    const location = useLocation();
    const { v, cantAsi } = location.state || {};
    const navigate = useNavigate()
    const cantidadAsientos = cantAsi; // Variable que controla la cantidad de asientos que se pueden seleccionar
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [occupiedSeats, setOccupiedSeats] = useState([]);

    useEffect(() => {
        // Simula la carga de datos iniciales desde la base de datos
        // Aquí deberías llamar a una función para cargar los asientos ocupados desde tu backend
        const loadInitialData = async () => {
            // Supongamos que los asientos ocupados se obtienen de la base de datos y son [0-1, 1-2]

            try {
                const res = await fetch(`http://localhost:4000/asientosvuelo/${v.id_vuelo}`, {
                    method: 'GET',
                    headers: { 'Content-Type': "application/json" }
                });
                const data = await res.json();
                const occupiedSeatNumbers = data.map(item => item.numero_asiento);
                console.log(occupiedSeatNumbers)
                setOccupiedSeats(occupiedSeatNumbers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        };

        loadInitialData();
    }, []);

    const toggleSeat = (rowIndex, seatIndex) => {
        const seat = `${rowIndex}-${seatIndex}`;

        // Verifica si el asiento está ocupado
        if (occupiedSeats.includes(seat)) {
            toast.error("Este asiento ya está ocupado.")
            //alert("Este asiento ya está ocupado.");
            return; // Si el asiento está ocupado, no hagas nada
        }

        const seatIndexInArray = selectedSeats.indexOf(seat);
        console.log('aqui' + seatIndexInArray)

        //Cuando toco asiento disponible
        if (seatIndexInArray === -1 && selectedSeats.length < cantidadAsientos) {
            setSelectedSeats([...selectedSeats, seat]);
            setTotalPrice(totalPrice + calculatePrice(rowIndex, seatIndex));
            //Para deseleccionar el asiento que escogi
        } else if (seatIndexInArray !== -1) {
            const updatedSeats = [...selectedSeats];
            updatedSeats.splice(seatIndexInArray, 1);
            setSelectedSeats(updatedSeats);
            setTotalPrice(totalPrice - calculatePrice(rowIndex, seatIndex));
        } else {
            toast.error("Ya has seleccionado el máximo de asientos.")
            //alert("Ya has seleccionado el máximo de asientos.");
        }
    };

    const calculatePrice = (rowIndex, seatIndex) => {
        // Implementa la lógica real para calcular el precio según la fila y el asiento seleccionado
        // Por ahora, simplemente devuelve un precio fijo de 10
        return 10;
    };

    

    const handleEscogerClick = async () => {
        if (selectedSeats.length == cantidadAsientos) {
            console.log("Asientos seleccionados:", selectedSeats);

            const body = JSON.stringify({
                idVuelo: v.id_vuelo, // Asegúrate de que v.id_vuelo contiene el ID del vuelo
                asientos: selectedSeats
            });

            try {
                // Enviar la petición al backend
                const res = await fetch('http://localhost:4000/ocuparasientos', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
    
                if (res.ok) {
                    // Manejar la respuesta exitosa del servidor
                    const responseData = await res.json();
                    console.log('Respuesta del servidor:', responseData);
                    toast.success('Asientos seleccionados correctamente');
                    navigate('/paseabordaje',{ state: { v, selectedSeats} })
                    // Redirigir o realizar cualquier otra acción necesaria
                } else {
                    // Manejar errores de la respuesta del servidor
                    const errorData = await res.json();
                    console.error('Error en la selección de asientos:', errorData);
                    toast.error('Hubo un problema al seleccionar los asientos');
                }
            } catch (error) {
                // Manejar errores de red u otros errores de la petición
                console.error('Error en la petición:', error);
                toast.error('Error al comunicarse con el servidor');
            }

            // Aquí agregarías la lógica para realizar la compra
        } else {
            toast.error(`Debes seleccionar ${cantidadAsientos} asientos.`)
            //alert(`Debes seleccionar ${cantidadAsientos} asientos.`);
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
