import {BrowserRouter,Routes,Route,Outlet,useNavigate} from 'react-router-dom'
import BarraNav from './pags/BarraNav'
import Login from './pags/Login'
import Registro from './pags/Registro'
import PiePaag from './pags/PiePaag'
import AccesoAdm from './pags/accessoRest'
import React, {useState, useEffect} from 'react'
import PrivateRoute from './PrivateRoute'

function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (boolean) => {
    setIsAuth(boolean);
    console.log("variable auth")
    console.log(isAuth);
  };

  async function estaAutenticado(){
    try {
      const respuesta = await fetch('http://localhost:4000/estalogin', {
        method: 'GET',
        headers: {token: localStorage.token}
      });

      const data = await respuesta.json()
      data === true? setIsAuth(true) :setIsAuth(false)
      
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    estaAutenticado()
  })
  
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/inicioSesion' 
            element={<PrivateRoute isAuth={isAuth} redirectPath='/acceso'> 
                                    <Login setAuth = {setAuth}/>
                    </PrivateRoute>} 
      />

      {/* Ruta para El Registro, lo que cargara solo para esa ruta */}
      <Route path='/registro' 
            element={<PrivateRoute isAuth={isAuth} redirectPath='/acceso'> 
                                    <Registro setAuth = {setAuth}/>
                    </PrivateRoute>} 
      />

      {/* RUTA QUE NECESITA EL INICIO DE SESION */}
      <Route path='/acceso' 
            element={<PrivateRoute isAuth={!isAuth} redirectPath='/inicioSesion'>
                                    <AccesoAdm setAuth = {setAuth}/>
                    </PrivateRoute>} 
      />

      {/* Rura Principal */}
      <Route path='/' element={<>
        <BarraNav/>
        <Outlet/>{/* Outlet para renderizar el contenido de las subrutas */}
        <PiePaag/>
      </>}/>
    </Routes>

  </BrowserRouter>
  )
}

export default App
