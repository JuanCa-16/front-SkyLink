import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';

const ListaEmp = ({ logueado }) => {

    // Obtener el rol del usuario desde el almacenamiento local
    const rol = localStorage.getItem('rol');

    const navigate = useNavigate()

    // Estado para almacenar la lista de usuarios
    const [usuarios, setUsuarios] = useState([])

    // Función para cargar la lista de usuarios
    const cargarUsuarios = async () => {

        const res = await fetch(`https://login-skl.vercel.app/usuarios`, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" }
        });

        const data = await res.json()
        setUsuarios(data)
        console.log(data)
    }

    // Función para eliminar un usuario
    const eliminar = async (id, nombre) => {

        const res = await fetch(`https://login-skl.vercel.app/usuarios/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });

        const data = await res.json()

        if (data.eliminado) {
            setModalIsOpen(false)
            toast.success(`${nombre} eliminado con exito`)
            setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.id !== id));
        }
    }

    //Para manejar buscador
    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    }

    useEffect(() => {
        // Cargar la lista de usuarios si el usuario está logueado y tiene rol de administrador
        if (logueado && rol === '3') {
            cargarUsuarios();
        } else {
            navigate("/inicioSesion");
        }
    }, [logueado, rol]);

    // Estado y función para controlar la apertura y cierre del modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const [selectedUser, setSelectedUser] = useState('');

    return (
        <div className='contenedor'>
            {
                (logueado && (rol == 3)) ? (<>
                    <h1 className='titulo'>Lista de Empleados</h1>
                    <input type="text" placeholder="Buscar por nombre o ID" value={filtro} onChange={handleFiltroChange} />
                    <div className="grid">
                        {usuarios
                            .filter(user => user.rol === 2 && (user.nombre.toLowerCase().includes(filtro.toLowerCase()) || user.apellidos.toLowerCase().includes(filtro.toLowerCase()) || user.id.includes(filtro)))
                            .map(user => (
                                <div className="listaEmp flex" key={user.id}>
                                    <div className="tarjeta">
                                        <h1>{user.nombre} {user.apellidos}</h1>
                                        <h3><span>Identificación:</span> {user.id}</h3>
                                        <h3><span>Correo:</span> {user.correo}</h3>
                                        <h3><span>Telefono:</span> {user.telefono}</h3>
                                        <h3><span>Fecha:</span> {user.fecha.substring(0, 10)}</h3>
                                        <h3><span>Pais:</span> {user.pais}</h3>
                                        {/* <button className='btn' onClick={() => eliminar(user.id, user.nombre)}>Eliminar</button> */}
                                        <button className='btn' onClick={() => { setModalIsOpen(true); setSelectedUser(user); }}>Eliminar</button>
                                        <ReactModal

                                            isOpen={modalIsOpen}
                                            onRequestClose={() => setModalIsOpen(false)}
                                            style={{
                                                overlay: {
                                                    backgroundColor: 'rgba(107, 105, 105, 0.1)', // Fondo oscuro con opacidad
                                                },
                                                content: {
                                                    width: '50%',
                                                    height: '30%',
                                                    margin: 'auto',
                                                    backgroundColor: '#ffffff', // Color de fondo del modal
                                                    borderRadius: '8px', // Borde redondeado para suavizar los bordes
                                                    outline: 'none', // Quita el borde de contorno
                                                    padding: '20px', // Espaciado interno para el contenido del modal
                                                    overflow: 'auto', // Agrega un desplazamiento si el contenido del modal es demasiado grande
                                                    lineHeight: '1.5',
                                                },
                                            }}

                                        >
                                            <h1>ELIMINAR </h1>
                                            <p>Estas seguro que quieres eliminar a {selectedUser.nombre} {selectedUser.apellidos} con identificacion {selectedUser.id} de tu lista de empleados?</p>
                                            <button className='btnModal cancelar' onClick={() => setModalIsOpen(false)}>Cancelar</button>
                                            <button className='btnModal' onClick={() => eliminar(selectedUser.id, selectedUser.nombre)}>Eliminar</button>
                                        </ReactModal>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </>) : navigate("/inicioSesion")
            }

        </div>
    )
}

export default ListaEmp
