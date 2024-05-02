import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom'
import React, {useState, useEffect, Fragment} from 'react'

//import PrivateRoute from './PrivateRoute'

//Componentes
import BarraNav from './pags/BarraNav'
import Login from './pags/Login'
import Registro from './pags/Registro'
import PiePaag from './pags/PiePaag'
import AccesoAdm from './pags/accessoRest'
import Principal from './pags/Principal'

function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  const estaAutenticado = async() => {
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
  },[])

  //Accesibles con logueo
  const PrivateRoute = ({ element, ...props }) => {
    return isAuth ? (
      element
    ) : (
      <Navigate to="/inicioSesion" replace />
    );
  };

  //Solo accesibles mientras no este logueado
  const PublicRoute = ({ element, ...props }) => {
    return isAuth ? (
      <Navigate to="/acceso" replace />
    ) : (
      element
    );
  };
  
  return (
    <Fragment>
    <BrowserRouter>
    <Routes>

      <Route path='/inicioSesion' 
            element={<PublicRoute element={ <Login setAuth = {setAuth}/>}/> } 
      />

      {/* Ruta para El Registro, lo que cargara solo para esa ruta */}
      <Route path='/registro' 
            element={<PublicRoute element={<Registro setAuth = {setAuth}/> }/>} 
      />

      {/* RUTA QUE NECESITA EL INICIO DE SESION */}
      <Route path='/acceso' 
            element={<>
            <BarraNav setAuth = {setAuth} logueado = {isAuth}/>
            <PrivateRoute element={ <AccesoAdm setAuth = {setAuth}/>}/>
            <PiePaag/>
            </>}
      />

        {/* Rura Principal */}
        <Route path='/' element={<>
          <BarraNav/>
          <Principal/>
          <Outlet/>{/* Outlet para renderizar el contenido de las subrutas */}
          <PiePaag/>
        </>}/>
      </Routes>

  </BrowserRouter>
  </Fragment>
  )
}

export default App
