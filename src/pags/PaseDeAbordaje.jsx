import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { useState, useEffect } from 'react'
const PaseDeAbordaje = () => {

    const navigate = useNavigate()

    const location = useLocation();
    const { v, selectedSeats, cantAsi, menu, equi } = location.state || {};
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
    const [id, setId] = useState("")
    const [precio, setprecio] = useState("")

    async function getName() {
        try {
            const response = await fetch(`https://login-skl.vercel.app/usuarioLogin`, {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const data = await response.json();
            setName(data.nombre + ' ' + data.apellidos);

            let cantAsientos = 1;

            let pre = busqueda.misClases === 'Economica'
                ? (100000 * cantAsientos)
                : busqueda.misClases === 'Ejecutiva'
                    ? (200000 * cantAsientos)
                    : (250000 * cantAsientos);

            let precioC = menu === 'Sin Comida'
                ? 0
                : menu === 'Saludable'
                    ? (100000 * cantAsientos)
                    : (menu === 'Fast Food'
                        ? (200000 * cantAsientos)
                        : (300000 * cantAsientos));

            let preE = equi === 'Sin Equipaje'
                ? 0
                : equi === 'Equipaje Mano'
                    ? (100000 * cantAsientos)
                    : (200000 * cantAsientos);

            let total = parseInt(precioC) + parseInt(preE) + parseInt(pre);
            setprecio(total)
            if (response.ok) {
                setId(data.id)
                const res = await fetch(`https://login-skl.vercel.app/millas/${data.id}`, {
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


    async function siguiente() {
        //let cantAsientos = parseInt(cantAsi);
        let cantAsientos = 1;

        let pre = busqueda.misClases === 'Economica'
            ? (100000 * cantAsientos)
            : busqueda.misClases === 'Ejecutiva'
                ? (200000 * cantAsientos)
                : (250000 * cantAsientos);

        let precioC = menu === 'Sin Comida'
            ? 0
            : menu === 'Saludable'
                ? (100000 * cantAsientos)
                : (menu === 'Fast Food'
                    ? (200000 * cantAsientos)
                    : (300000 * cantAsientos));

        let preE = equi === 'Sin Equipaje'
            ? 0
            : equi === 'Equipaje Mano'
                ? (100000 * cantAsientos)
                : (200000 * cantAsientos);

        let total = parseInt(precioC) + parseInt(preE) + parseInt(pre);

        console.log(total)
        const body = JSON.stringify({
            precio: total,
            id_vuelo: v.id_vuelo,
            id_usuario: id,
            asientos: selectedSeats,
            clase: busqueda.misClases,
            comida: menu,
            maleta: equi
        });

        console.log(body)

        const pase = await fetch(`https://login-skl.vercel.app/paseAbordaje`, {
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

     //ESTILOS del boton para imprimir
    const buttonStyle= {
        background: '#13257fcc',
        padding: '10px',
        marginTop: '10px',
        color: 'white', // Asegúrate de agregar el color de texto para que sea visible
        textDecoration: 'none', // Para eliminar la subrayado del enlace
        display: 'inline-block',
        borderRadius: '20px',
        cursor: 'pointer',
    }


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
                        <div className="info"><span>Equipaje</span><br />{equi}</div>
                        <div className="info"><span>Comida</span><br />{menu}</div>
                        <div className="info"><span>E-ticket</span><br />{eTicket}</div>
                        <div className="info"><span>Clase</span><br />{busqueda.misClases}</div>
                        <div className="info"><span>Precio por Pasaje</span><br />{precio}</div>
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


            <div >
                <PDFDownloadLink
                    document={<PDFDocument name={name} busqueda={busqueda} v={v} eTicket={eTicket} selectedSeats={selectedSeats} puerta={puerta} />}
                    fileName="pase_de_abordaje.pdf"
                    style={buttonStyle}
                >
                    {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Imprimir Tiquete')}
                </PDFDownloadLink>
            <button onClick={() => siguiente()}>Continuar</button>
            </div>
        </div>
    );
}

export default PaseDeAbordaje






