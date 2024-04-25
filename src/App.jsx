import {BrowserRouter,Routes,Route,Outlet} from 'react-router-dom'
import BarraNav from './pags/BarraNav'
import Login from './pags/Login'
import Registro from './pags/Registro'
import PiePaag from './pags/PiePaag'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Para El login */}
        <Route path='/inicio-sesion' element={<>
          <Login/>
          
        </>}/>

        {/* Ruta para El Registro, lo que cargara solo para esa ruta */}
        <Route path='/registro' element={<>
          <Registro/>
        </>}/>

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
