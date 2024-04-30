import React from 'react'
import {useState, useEffect} from 'react'
//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

import {Link, useNavigate} from 'react-router-dom';

const BarraNav = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión
    const actualizar= (estado) => {
        setIsLoggedIn(estado);
    };
    const navigate = useNavigate()
    return (
        //Header contendra toda la barra de navegacion Principal sin iniciar sesion
        <header className='navBar flex'>
            <nav className='flex'>
                {/* //p1 sera la primera mitad de la barra contendra el logo y nombre de la compañia */}
                <div className='flex p1'>
                    <img className='logo'src={logoSky} />
                    <Link to='/' className='sinSubrayado'>
                        <h4>SkyLink</h4>
                    </Link>
                </div>
                {/* //p2 sera la segunda mitad de la barra contendra el inicio de sesion y el submenu */}
                <div className='flex p2'>
                    {isLoggedIn? (
                        <>
                            <h4 className='texto'>BIENVENIDO</h4>
                        </>
                    ):( 
                    <button className='texto' onClick={() => navigate('/inicioSesion')}>Iniciar Sesion</button>
                    )}
                    <div className='flex icono'><HiMenu /></div>
                </div>
            </nav>
        </header>
    )
}

export default BarraNav;