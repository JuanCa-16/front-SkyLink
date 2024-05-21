import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';
import icon from '../recursos/airplane.png'
import React, { useState, useEffect } from 'react';

const planeIcon = new Icon({
    iconUrl: icon, // URL de la imagen del icono de avión
    iconSize: [50, 50], // Tamaño del icono [ancho, alto]
  });

const Radar = () => {
    // Estado para almacenar las posiciones de los marcadores
    const [markerPositions, setMarkerPositions] = useState([]);

    // Función para generar coordenadas aleatorias dentro de un rango
    const generateRandomCoordinates = () => {
        const randomLat = Math.random() * (180) - 90;
        const randomLng = Math.random() * (360) - 180;
        return [randomLat, randomLng];
    };

    // Función para actualizar las posiciones de los marcadores cada 10 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            const newPositions = [];
            for (let i = 0; i < 1000; i++) {
                newPositions.push(generateRandomCoordinates());
            }
            setMarkerPositions(newPositions);
        }, 10000); // 10 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    // Generar los marcadores con las posiciones actuales
    const markers = markerPositions.map((position, index) => (
        <Marker position={position} key={index} icon={planeIcon}>
            <Popup>
                Vuelo  #{index + 1}
            </Popup>
        </Marker>
    ));

    return (

        <div className="radar">
            <MapContainer center={[4.5709, -74.2973]} zoom={7} style={{ height: '100vh', width: '100%', borderRadius: '2rem', zIndex: '0' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
                </MapContainer>
            </div>
    )
}

export default Radar
