import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

const BarraNav = ({ setAuth, logueado }) => {

    const navigate = useNavigate()

    // Obtenemos el rol del usuario del localStorage
    const rol = localStorage.getItem('rol');

    // Hook para obtener la ubicación actual
    const location = useLocation();

    const [name, setName] = useState("")

    // Función asincrónica para obtener el nombre del usuario
    async function getName() {

        try {
            const response = await fetch('http://localhost:4000/usuarioLogin', {
                method: 'GET',
                headers: { token: localStorage.token } // Para que rellene los campos
            });

            const data = await response.json()
            setName(data.nombre);
        } catch (err) {
            console.error(err.message);
        }
    }

    // useEffect para llamar a getName cuando el componente se monta
    useEffect(() => {
        getName()
    }, [])

    // Función para manejar el cierre de sesión
    const salir = (e) => {
        // Prevenir que se actulize la pag al enviar el formulario
        e.preventDefault()

        // Eliminamos el token y el rol del localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("rol")

        toast.success("Cierre de Sesion Exitoso")

        // Actualizamos el estado de autenticación
        setAuth(false)
        setMenuOpen(false);
    }

    const [menuOpen, setMenuOpen] = useState(false);

    // Función para alternar el estado del menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // useEffect para cerrar el menú cuando la ruta cambia
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

    return (
        //Header contendra toda la barra de navegacion Principal sin iniciar sesion
        <header className='navBar flex'>
            <nav className='flex'>

                {/* //p1 sera la primera mitad de la barra contendra el logo y nombre de la compañia */}
                <div className='flex p1'>
                    <img className='logo' src={logoSky} />
                    <Link to='/' className='sinSubrayado'>
                        <h4>SkyLink</h4>
                    </Link>
                </div>
                
                {/* //p2 sera la segunda mitad de la barra contendra el inicio de sesion y el submenu */}
                <div className='flex p2'>

                    {/* //Info si esta Logueado */}
                    {logueado ? (
                        <>
                            <div className='flex'>
                                <p className='usuario'>Bienvenido {name}</p>
                                {/* <button className='texto' onClick={() => navigate('/acceso/perfil')}>Editar Perfil</button> */}
                                {/* <button className='texto' onClick={(e)=>salir(e)}>Salir</button> */}
                                <div className="contenedor-menu">
                                    <input type="checkbox" id="menu-toggle" className="menu-toggle" defaultChecked={menuOpen} />
                                    <label htmlFor="menu-toggle" ><div className='flex icono' onClick={toggleMenu}><HiMenu /></div></label>
                                    <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                                        <ul>
                                            <li className='primero'><div className='flex icono izq' onClick={toggleMenu}><HiMenu /></div></li>
                                            <li><a className='texto' onClick={() => navigate('/')}>Inicio</a></li>
                                            <li><a className='texto' onClick={() => navigate('/perfil')}>Editar Perfil</a></li>
                                            <li><a className='texto' onClick={() => navigate('/tusvuelos')}>Tus Viajes</a></li>
                                            <li><a className='texto' onClick={() => navigate('/radar')}>Radar</a></li>

                                            {
                                                (rol == 2) ? (<>
                                                    <li><a className='texto' onClick={() => navigate('/vuelosAsignados')}>Vuelos Asigandos</a></li>
                                                </>) : (
                                                    (rol == 3) ? (<>
                                                        <li><a className='texto' onClick={() => navigate('/vuelosAsignados')}>Vuelos Asigandos</a></li>
                                                        <li><a className='texto' onClick={() => navigate('/crearVuelos')}>Creacion de vuelos</a></li>
                                                        <li><a className='texto' onClick={() => navigate('/crearEmpleado')}>Crear Empleado</a></li>
                                                        <li><a className='texto' onClick={() => navigate('/listaEmpleados')}>Lista de Empleados</a></li>
                                                    </>) : (<></>)
                                                )
                                            }

                                            <li><a className='texto' onClick={(e) => salir(e)}>Salir</a></li>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Info si no esta logueado
                        <>
                            <button className='texto' onClick={() => navigate('/inicioSesion')}>Iniciar Sesion</button>
                            <div className="contenedor-menu">
                                <input type="checkbox" id="menu-toggle" className="menu-toggle" defaultChecked={menuOpen} />
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