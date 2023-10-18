import { useState } from "react"
import {useEffect} from 'react'
function Main(){
        const[cep, setCep] = useState()
        const[lat, setLat] = useState()
        const[long, setLong] = useState()
        const[temp, setTemp] = useState()
       
       const apiKey = '2441a36e15c2473995ca043491a2dc3b'
       const apiKeyTempo  = '8850da5459b854e6c2d0749f58598c14'
        let buscaLatLong = () => {
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apiKey}`)
                .then((r) => r.json())
                .then((resposta) =>{
                    let latLong = resposta.results
                    setLat(latLong[0].geometry.lat)
                      setLong(latLong[0].geometry.lng)
                   })
        }

        useEffect(()=>{
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeyTempo}`)
            .then((r) => r.json())
            .then((data) => {
                console.log(data.main.temp)
                setTemp(data.main.temp )
               
            })
            
        })
        let result = parseInt(temp)
        result = result.toFixed()
   
        
    
        console.log(cep)
    return(
        <> 
            <input type="number" onChange={(e) => setCep(e.target.value)} placeholder="seu cep" required />
            <button onClick={buscaLatLong}>Enviar</button>
            <p>{result - 273}ºC</p>
        </>
    )
}

export default Main