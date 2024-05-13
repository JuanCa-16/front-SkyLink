import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

const ListaEmp = ({ logueado }) => {

    const rol = localStorage.getItem('rol');
    const navigate = useNavigate()

    const [usuarios, setUsuarios] = useState([])
    const cargarUsuarios = async () => {
        const res = await fetch('http://localhost:4000/usuarios', {
            method: 'GET',
            headers: { 'Content-Type': "application/json" }
        });

        const data = await res.json()
        setUsuarios(data)
    }

    const eliminar = async (id, nombre) => {
        const res = await fetch(`http://localhost:4000/usuarios/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });

        const data = await res.json()

        if (data.eliminado) {
            toast.success(`${nombre} eliminado con exito`)
            setUsuarios([])
        }
    }

    useEffect(() => {
        cargarUsuarios()
    }, [usuarios])

    return (
        <div className='contenedor'>
            {
                (logueado && (rol == 3)) ? (<>
                    <h1 className='titulo'>Lista de Empleados</h1>
                    <div className="grid">
                        {usuarios
                            .filter(user => user.rol === 2)
                            .map(user => (
                                <div className="listaEmp flex" key={user.id}>
                                    <div className="tarjeta">
                                        <h1>{user.nombre} {user.apellidos}</h1>
                                        <h3><span>Identificación:</span> {user.id}</h3>
                                        <h3><span>Correo:</span> {user.correo}</h3>
                                        <h3><span>Telefono:</span> {user.telefono}</h3>
                                        <h3><span>Fecha:</span> {user.fecha.substring(0, 10)}</h3>
                                        <h3><span>Pais:</span> {user.pais}</h3>
                                        <button className='btn' onClick={() => eliminar(user.id, user.nombre)}>Eliminar</button>
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
