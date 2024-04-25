import React from 'react'

import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

const PiePaag = () => {
    return (
        <footer className='piePag flex'>
            <div className='contenedorPiePag grid'>

                <div className='boxFlex'>

                    <div className='logoDiv'>
                        <img className='logo'src={logoSky} />
                    </div>

                    <p>Tu mente debe ser mas fuerte que tus sentimientos, vuela!</p>

                    <div className='socialIcon flex'>
                        <FaFacebookSquare className='icon'/>
                        <FaSquareXTwitter className='icon'/>
                        <BsYoutube className='icon'/>
                        <AiFillInstagram className='icon'/>
                    </div>
                </div>

                <div className="box">
                    <h2>Politica de Cancelacion y Reemblosos</h2>
                    <p>La empresa ofrece flexibilidad en caso de que necesites
                        cancelar tu reserva. Consulta nuestros términos y condiciones 
                        para obtener más detalles 
                        sobre las políticas de cancelación y reembolso.</p>
                </div>

                <div className="box">
                    <h2>Politicas de Privacidad y Seguridad</h2>
                    <p>Nos comprometemos a proteger tu información personal y garantizar 
                        la seguridad de tus transacciones en línea. 
                        Lee nuestra política de privacidad 
                        para conocer cómo manejamos tus datos.</p>
                </div>

                <div className="box bigBox">
                    <h2>Politicas de Resposabilidad</h2>
                    <p>Nuestro compromiso es proporcionar un servicio confiable y de calidad. Sin embargo, en caso de eventos imprevistos o fuera de nuestro control, consulta nuestra política de responsabilidad para conocer tus derechos y opciones disponibles.</p>
                </div>

            </div>
        </footer>
    )
}

export default PiePaag
