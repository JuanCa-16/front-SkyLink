import React from 'react'
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaPlane } from 'react-icons/fa';

const Radar = () => {
    return (
        
            <div className="radar">
                <MapContainer center={[4.5709, -74.2973]} zoom={7} style={{ height: '100vh', width:'100%', borderRadius:'2rem', zIndex:'0'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[4.5709, -74.2973]}>
                    <Popup>
                        <FaPlane /> Este es un avión
                    </Popup>
                </Marker>
                </MapContainer>
            </div>
    )
}

export default Radar
