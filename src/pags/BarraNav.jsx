import React from 'react'
import {useState, useEffect} from 'react'
//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

import {Link, useNavigate} from 'react-router-dom';

const BarraNav = ({setAuth, logueado}) => {

    const[name,setName] = useState("")

    async function getName(){
        try {
        const response = await fetch('http://localhost:4000/usuarioLogin', {
            method: 'GET',
            headers: {token: localStorage.token} // Para que rellene los campos
        });

        const data = await response.json()
        setName(data.nombre)
        } catch (err) {
        console.error(err.message);
        }
    }

    useEffect(() => {
        getName()
    },[])

    const salir = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    } 
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
                    {logueado? (
                        <>
                            <div className=''>
                                <p className='usuario'>Bienvenido {name}</p>
                                <button className='texto' onClick={() => navigate('/acceso/perfil')}>Editar Perfil</button>
                                <button className='texto' onClick={(e)=>salir(e)}>Salir</button>
                            </div>
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