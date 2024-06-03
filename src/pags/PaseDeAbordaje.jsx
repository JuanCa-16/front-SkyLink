import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useState, useEffect } from 'react'
const PaseDeAbordaje = () => {

    const navigate = useNavigate()

    const location = useLocation();
    const { v, selectedSeats, cantAsi } = location.state || {};
    const busqueda = JSON.parse(localStorage.getItem("busqueda"));

    // Función para generar un número entero aleatorio entre min (incluido) y max (excluido)
    function numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Función para generar una letra aleatoria (mayúscula o minúscula)
    function letraAleatoria(mayuscula = true) {
        const letras = mayuscula ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
        return letras.charAt(Math.floor(Math.random() * letras.length));
    }

    // Función para generar una cadena de caracteres aleatorios de una longitud específica
    function cadenaNumerosAleatoria(longitud) {
        const numeros = '0123456789';
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            resultado += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
        return resultado;
    }
    const numeroVuelo = `${letraAleatoria()}${letraAleatoria()} ${numeroAleatorio(1000, 9999)}`;
    const asiento = `${numeroAleatorio(1, 9)}${letraAleatoria()}`;
    const eTicket = cadenaNumerosAleatoria(13);
    const puerta = `${letraAleatoria()}${cadenaNumerosAleatoria(2)}`;

    const [name, setName] = useState("")
    const [id,setId] = useState("")

    async function getName() {
        try {
            const response = await fetch('http://localhost:4000/usuarioLogin', {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const data = await response.json();
            setName(data.nombre + ' ' + data.apellidos);
            
            if (response.ok) {
                setId(data.id)
                const res = await fetch(`http://localhost:4000/millas/${data.id}`, {
                    method: 'PUT',
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Respuesta del servidor:', data.message, data.usuario.millas);
                    toast.success(data.message + data.usuario.millas);
                } else {
                    const errorData = await res.json();
                    console.error('Error millas:', errorData);
                }
            }

        } catch (err) {
            console.error(err.message);
        }
    }


    async function siguiente(){
        let pre = busqueda.misClases === 'Economica' ? (100000 * cantAsi) : busqueda.misClases === 'Ejecutiva' ? (200000 * cantAsi) : (250000*cantAsi)
                
                const body = JSON.stringify({
                    precio: pre,
                    id_vuelo:v.id_vuelo,
                    id_usuario: id,
                    asientos: selectedSeats,
                    clase: busqueda.misClases
                });

                console.log(body)

                const pase = await fetch('http://localhost:4000/paseAbordaje', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (pase.ok) {
                    const data = await pase.json();
                    toast.success(data.message);
                    navigate('/')
                } else {
                    const errorData = await pase.json()
                }
    }


    useEffect(() => {
        getName()
    }, []);


    return (
        <div className="bodyAbordaje">
            <div className="pase-de-abordaje">
                <div className="encabezado">
                    <div className="aerolinea">SkyLink</div>
                    <div className="titulo-pase">PASE DE ABORDAJE</div>
                </div>
                <div className="detalles">
                    <div className="info-pasajero">
                        <div className="info"><span>Nombre del pasajero</span><br />{name}</div>
                        <div className="info"><span>Fecha:</span><br />{busqueda.fecha}</div>
                        <div className="info"><span>Salida</span><br />{v.nombre_aeropuerto_salida}</div>
                        <div className="info"><span>Destino</span><br />{v.nombre_aeropuerto_llegada}</div>
                        <div className="info"><span>Transportadora</span><br /> AC</div>
                        <div className="info"><span>N° de Vuelo</span><br /> {v.id_vuelo}</div>
                        <div className="info"><span>Equipaje</span><br />S</div>
                        <div className="info"><span>E-ticket</span><br />{eTicket}</div>
                        <div className="info"><span>Clase</span><br />{busqueda.misClases}</div>
                        <div className="info">
                            <span>Asiento</span><br />
                            {selectedSeats.map((asiento, index) => (
                                <div key={index}>{asiento}</div>
                            ))}
                        </div>

                    </div>
                    <div className="codigo-barra">
                        {/* Espacio reservado para el Código de Barras */}
                    </div>
                    <div className="puerta-hora">
                        <div className="info"><span>Puerta</span><br />{puerta}</div>
                        <div className="info"><span>Hora</span><br />{v.hora}</div>
                    </div>
                </div>
            </div>

            <button onClick={() => siguiente()}>Continuar</button>
        </div>
    );
}

export default PaseDeAbordaje






