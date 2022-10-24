import React, { useEffect, useState } from 'react'
import axios from "axios"

const PaisSeleccionado = (props) => {
  const [clima, setClima] = useState('')
  const [datos, setDatos] = useState([])
  const convertidor = (clima - 273.5).toFixed(1)
  const hooks = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=1349277c4e6631b24f02152ca4135cce`)
    .then(response => {
      setClima(response.data.main.temp)
      setDatos(response.data.main)
    })
  }
  useEffect(hooks, [])
  return(
    <>
      <h2>{props.nombre}</h2>
      <p>capital: {props.capital}</p>
      <p>Poblacion: {props.poblacion}</p>
      <h3>Idiomas</h3>
      <ul>
        {Object.values(props.idiomas).map((a,index)=>{
          return <li key={index}>{a}</li>
        })}
      </ul>
      <img src={props.bandera}></img>
      <h3>Clima actual en {props.capital} {convertidor} °C</h3>
      <p>Temperatura maxima: {((datos.temp_max)-273.5).toFixed(1)} °C</p>
      <p>Temperatura minima: {((datos.temp_min)-273.5).toFixed(1)} °C</p>
    </>
  )
}

const Buscador = ({lista}) => {
  const [buscado, setBuscado] = useState('')
  const cambiarBusqueda = (event) => {
    setBuscado(event.target.value)
  }
  let filtrado = lista.filter((pais) => pais.name.official.toLowerCase().includes(buscado.toLocaleLowerCase()));
  if(buscado === ''){
    return(
      <>
        <input value={buscado} onChange={cambiarBusqueda}/>
      </>
    )
  }else if(filtrado.length === 1){
    return(
      <>
        <input value={buscado} onChange={cambiarBusqueda}/>
        <PaisSeleccionado nombre = {filtrado[0].name.common} capital={filtrado[0].capital} bandera={filtrado[0].flags.png} poblacion={filtrado[0].population} idiomas={filtrado[0].languages}/>
      </>
    )
  }else if(buscado !== "" && filtrado.length === 0){
    return(
      <>
        <input value={buscado} onChange={cambiarBusqueda}/>
        <p>No hay Resultados</p>
      </>
    )
  }else if(filtrado.length > 0 && filtrado.length < 10){
    return(
      <>
        <input value={buscado} onChange={cambiarBusqueda}/>
        <ul>
          {filtrado.map((pais) => 
            <li key={pais.name.official}>{pais.name.official} <button onClick={()=>setBuscado(pais.name.official)}>x</button></li>)
          }
        </ul>
      </>
    )
  }else{
    return(
      <>
        <input value={buscado} onChange={cambiarBusqueda}/>
        <p>Demasiadas coincidencias</p>
      </>
    )
  }
}


const App = () => {
  const [datos, setDatos] = useState([])
  const hook = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setDatos(response.data)
    })
  }
  useEffect(hook,[])

  return (
    <>
      <Buscador lista={datos}/>
    </>
  );
}

export default App;
