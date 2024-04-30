import React from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaUser } from "react-icons/fa";

//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from "../recursos/LogoSkyLink.png";

const Principal = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Reserva tu vuelo</h1>
      </div>

      <div className="results">
        <div className="flight">
          <div className="info">
            <h3>Economy</h3>
            <p>Clase turista</p>
          </div>
        </div>

        <div className="flight">
          <div className="info">
            <h3>Business Class</h3>
            <p>Clase ejecutiva</p>
          </div>
        </div>

        <div className="flight">
          <div className="info">
            <h3>First Class</h3>
            <p>Primera clase</p>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <div className="origin">
          <FaPlaneDeparture className="icon" />
          <input type="text" placeholder="Aeropuerto de origen" />
        </div>

        <div className="separacion"></div>

        <div className="destination">
          <FaPlaneArrival className="icon" />
          <input type="text" placeholder="Aeropuerto de destino" />
        </div>
      </div>
      <div className="search-bar2">
        <div className="filter">
          <label htmlFor="departureDate">Fecha de ida:</label>
          <input type="date" id="departureDate" />
        </div>

        <div className="filter">
          <label htmlFor="returnDate">Fecha de regreso:</label>
          <input type="date" id="returnDate" />
        </div>

        <div className="filter">
          <label htmlFor="passengers">Cantidad de pasajeros:</label>
          <div className="input-container">
            <input type="number" id="passengers" min="1" />
            <FaUser className="icon" />
          </div>
        </div>
      </div>

      <div className="buttons">
        <button type="button">Buscar</button>
      </div>

      <div className="flight-info">
        <div className="flight-info-item">
          <h3>Reserva fácil y rápida de vuelos</h3>
          <label>Con nuestra aplicación, reservar vuelos es 
            simple y conveniente. Explore una amplia gama de opciones y reserve 
            su vuelo perfecto en solo unos pocos clics</label>
        </div>

        <div className="flight-info-item">
          <h3>Gestione sus reservas en cualquier momento</h3>
          <label>Modifique fechas, seleccione asientos y realice el check-in en 
            línea con facilidad. Nuestra aplicación le da el control total sobre 
            su viaje, adaptándose a sus necesidades</label>
        </div>

        <div className="flight-info-item">
          <h3>Información de vuelos en tiempo real</h3>
          <label>Manténgase informado sobre el estado de su vuelo, horarios de salida, 
            llegadas y más, para una experiencia de viaje sin preocupaciones desde el 
            principio hasta el final</label>
        </div>
      </div>
    </div>
  );
};

export default Principal;
