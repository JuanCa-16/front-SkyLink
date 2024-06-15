import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const TusVuelos = ({ logueado }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [vuelos, setVuelos] = useState([]);

  const fetchData = async () => {
    try {
      // Obtener el id del usuario que está logueado
      const response = await fetch(`https://login-skl.vercel.app/usuarioLogin`, {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const dat = await response.json();
      const userId = dat.id;
      setId(userId);

      // Obtener los vuelos asignados al usuario
      const vuelosResponse = await fetch(`https://login-skl.vercel.app/obtenerCompras/${userId}`, {
        method: 'GET'
      });

      const vuelosData = await vuelosResponse.json();

      if (vuelosResponse.status === 200) {
        const filteredVuelos = vuelosData.filter(vuelo => new Date(vuelo.fecha) < new Date());
        setVuelos(filteredVuelos);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Error al obtener los vuelos');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (<div className='tusVuelos'>
    {logueado ? (
      <>
        <h1>VUELOS COMPRADOS</h1>
        <div className="vuelos">
          {Array.isArray(vuelos) && vuelos.length > 0 ? (
            vuelos.flatMap(vuelo => {
              const asientos = vuelo.asientos.split(',');
              return asientos.map(asiento => (
                <div key={`${vuelo.Id_Tiquete}-${asiento}`} className="tarjeta">
                  <div className="header">
                    <div className="airline">SkyLink</div>
                    <div className="boardingPassTitle">PASE DE ABORDAJE</div>
                  </div>
                  <div className="details">
                    <div className="passengerInfo">
                      <div className="info">
                        <div className="infoText">Fecha</div>
                        <div>{vuelo.fecha.substring(0, 10)}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Salida</div>
                        <div>{vuelo.aeropuerto_salida}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Destino</div>
                        <div>{vuelo.aeropuerto_llegada}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">N° de Vuelo</div>
                        <div>{vuelo.id_vuelo}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Clase</div>
                        <div>{vuelo.clase}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Asiento</div>
                        <div>{asiento}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Precio</div>
                        <div>{vuelo.precio}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Equipaje</div>
                        <div>{vuelo.maleta}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="info">
                        <div className="infoText">Comida</div>
                        <div>{vuelo.comida_nombre}</div>
                        <div className="infoAfter"></div>
                      </div>
                      <div className="infoBefore">
                          <div>{new Date(vuelo.fecha) < new Date() && <div className="realizado">REALIZADO</div>}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ));
            })
          ) : (
            <div>
              <h1>No se encontraron vuelos.</h1>
            </div>
          )}
        </div>
      </>
    ) : navigate("/inicioSesion")}
  </div>
  );
};

export default TusVuelos;