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
import EditarPerfil from './pags/EditarPerfil'
import Empleado from './pags/Empleado'
import Admin from './pags/Admin'
import Radar from './pags/Radar'

function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  //Verificar si inicio sesion si encuentra un token
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
            <Principal/>
            <PiePaag/>
            </>}
      />

      <Route path='/acceso/perfil' 
            element={<>

            <PrivateRoute element={ <EditarPerfil/>}/>
            <PiePaag/>
            </>}
      />  

      <Route path='/empleado' 
            element={<>
            <Empleado logueado={isAuth}/>
            <PiePaag/>
            </>}
      /> 
      <Route path='/admin' 
            element={<>
            <Admin logueado={isAuth}/>
            <PiePaag/>
            </>}
      /> 

      {/* Rura Principal */}
      <Route path='/radar' element={<>
        <BarraNav/>
        <Radar/>
        <PiePaag/>
        {/* <EditarPerfil/> */}
      </>}/>

      {/* Rura Principal */}
      <Route path='/' element={<>
        <BarraNav/>
        <Principal/>
        <Outlet/>
        <PiePaag/>
        {/* <EditarPerfil/> */}
      </>}/>

    </Routes>

  </BrowserRouter>
  </Fragment>
  )
}

export default App
