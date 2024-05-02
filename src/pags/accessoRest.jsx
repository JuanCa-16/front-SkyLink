import React, { useEffect, useState } from 'react'

const accessoRest = ({setAuth}) => {
  const[name,setName] = useState("")

  async function getName(){
    try {
      const response = await fetch('http://localhost:4000/usuarioLogin', {
        method: 'GET',
        headers: {token: localStorage.token} // Para que rellene los campos
      });

      const data = await response.json()
      setName(data.nombre)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName()
  },[])

  const salir = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }
  return (
    <div>
      <h1>Bienvenido {name}</h1>
      <button onClick={(e)=>salir(e)}>SALIR</button>
    </div>
  )
}

export default accessoRest
