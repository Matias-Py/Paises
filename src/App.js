import React, { useEffect, useState } from 'react'
import axios from "axios"
import lupa from "./imagenes/lupa.svg"

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
    <div id='infoPais'>
      <div id="contenidoInfoPais">
        <img id="foto" src={props.bandera}></img>
        <h2>{props.nombre}</h2>
        <h4>Capital: {props.capital}</h4>
        <h4>Poblacion: {props.poblacion}</h4>
        <h4>Idiomas</h4>
        <ul>
          {Object.values(props.idiomas).map((a,index)=>{
            return <li key={index}>{a}</li>
          })}
        </ul>
        <h3>Temperatura actual en {props.capital} {convertidor} °C</h3>
        <p>Temperatura maxima para hoy: {((datos.temp_max)-273.5).toFixed(1)} °C</p>
        <p>Temperatura minima para hoy: {((datos.temp_min)-273.5).toFixed(1)} °C</p>
      </div>
    </div>
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
      <div id='contenedorInicial'>
        <h1>Busca algún pais</h1>
        <div id='contenedorInicialInput'>
          <input value={buscado} onChange={cambiarBusqueda} placeholder="Busca un pais..."/>
        </div>
      </div>
    )
  }else if(filtrado.length === 1){
    return(
      <div id="resultadoEncontrado">
        <div id='contenedorInputCoindencia'>
          <input id="inputcoincidencia" value={buscado} onChange={cambiarBusqueda}/>
        </div>
        <PaisSeleccionado nombre = {filtrado[0].name.common} capital={filtrado[0].capital} bandera={filtrado[0].flags.png} poblacion={filtrado[0].population} idiomas={filtrado[0].languages}/>
      </div>
    )
  }else if(buscado !== "" && filtrado.length === 0){
    return(
      <div className='demasiadascoincidencias'>
        <div className='buscadorDemasiadasCoincidencias'>
          <input value={buscado} onChange={cambiarBusqueda}/>
        </div>
        <p>No hay Resultados</p>
      </div>
    )
  }else if(filtrado.length > 0 && filtrado.length < 10){
    return(
      <div id='listaResultados'>
        <div id='contenedorInputListaResultados'>
          <input value={buscado} onChange={cambiarBusqueda}/>
        </div>
        <ul>
          {filtrado.map((pais) => 
            <li key={pais.name.official}>{pais.name.official} <button onClick={()=>setBuscado(pais.name.official)}>Ver más</button></li>)
          }
        </ul>
      </div>
    )
  }else{
    return(
      <div className='demasiadascoincidencias'>
        <div className='buscadorDemasiadasCoincidencias'>
          <input value={buscado} onChange={cambiarBusqueda}/>
        </div>
        <p>Demasiadas coincidencias</p>
      </div>
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
