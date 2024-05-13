import React from 'react'
import {useState, useEffect} from 'react'
//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

import {Link, useNavigate, useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BarraNav = ({setAuth, logueado}) => {
    const location = useLocation();
    const[name,setName] = useState("")
    
    async function getName(){
        try {
        const response = await fetch('http://localhost:4000/usuarioLogin', {
            method: 'GET',
            headers: {token: localStorage.token} // Para que rellene los campos
        });

        const data = await response.json()
        setName(data.nombre);
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
        localStorage.removeItem("rol")
        toast.success("Cierre de Sesion Exitoso")
        setAuth(false)
        setMenuOpen(false);
    } 
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Restablecer el estado del menú cuando se cambie de página
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

    const rol = localStorage.getItem('rol');

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

                    {/* //Info si esta Logueado */}
                    {logueado? (
                        <>
                            <div className='flex'>
                                <p className='usuario'>Bienvenido {name}</p>
                                {/* <button className='texto' onClick={() => navigate('/acceso/perfil')}>Editar Perfil</button> */}
                                {/* <button className='texto' onClick={(e)=>salir(e)}>Salir</button> */}
                                <div className="contenedor-menu">
                                    <input type="checkbox" id="menu-toggle" className="menu-toggle" defaultChecked={menuOpen}/>
                                        <label htmlFor="menu-toggle" ><div className='flex icono' onClick={toggleMenu}><HiMenu /></div></label>
                                        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                                            <ul>
                                            <li className='primero'><div className='flex icono izq' onClick={toggleMenu}><HiMenu /></div></li>
                                            <li><a className='texto' onClick={() => navigate('/')}>Inicio</a></li>
                                            <li><a className='texto' onClick={() => navigate('/perfil')}>Editar Perfil</a></li>
                                            <li><a className='texto' href="#">Tus Viajes</a></li>
                                            <li><a className='texto' onClick={() => navigate('/radar')}>Radar</a></li>

                                            {
                                                (rol == 2) ? (<>
                                                    <li><a className='texto' href="#">Vuelos Asigandos</a></li>
                                                    <li><a className='texto' href="#">Edicion de vuelos</a></li>
                                                </>) : (
                                                    (rol == 3) ? (<>
                                                        <li><a className='texto' href="#">Vuelos Asigandos</a></li>
                                                        <li><a className='texto' href="#">Edicion de vuelos</a></li>
                                                        <li><a className='texto' href="#">Creacion de vuelos</a></li>
                                                        <li><a className='texto' onClick={() => navigate('/crearEmpleado')}>Crear Empleado</a></li>
                                                        <li><a className='texto' onClick={() => navigate('/listaEmpleados')}>Lista de Empleados</a></li>
                                                    </>) : (<></>)
                                                )
                                            }

                                            <li><a className='texto' onClick={(e)=>salir(e)}>Salir</a></li>

                                            </ul>
                                        </nav>
                                </div>
                            </div>
                        </>
                    ):( 
                    // Info si no esta logueado
                    <>
                    <button className='texto' onClick={() => navigate('/inicioSesion')}>Iniciar Sesion</button>
                    <div className="contenedor-menu">
                        <input type="checkbox" id="menu-toggle" className="menu-toggle" defaultChecked={menuOpen}/>
                            <label htmlFor="menu-toggle" ><div className='flex icono' onClick={toggleMenu}><HiMenu /></div></label>
                            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                                <ul>
                                <li className='primero'><div className='flex icono izq' onClick={toggleMenu}><HiMenu /></div></li>
                                <li><a className='texto' onClick={() => navigate('/')}>Inicio</a></li>
                                <li><a className='texto' href="#">Tus Viajes</a></li>
                                <li><a className='texto' onClick={() => navigate('/radar')}>Radar</a></li>
                                </ul>
                            </nav>
                    </div>
                    </>
                    )}
                    {/* <div className='flex icono'><HiMenu /></div> */}
                </div>
            </nav>
        </header>
    )
}

export default BarraNav;