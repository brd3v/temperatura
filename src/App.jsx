import { useEffect, useState } from 'react'
import { BsFillCloudsFill, BsFillCloudRainFill, BsSnow2, BsFillSunFill } from 'react-icons/bs';


import './App.css'

function App() {
  const[lat,setLat] = useState()
  const[long, setLong] = useState()
  let[temp, setTemp] = useState()
  const[description, setDescription] = useState()
  const[temperatura, setTemperatura] = useState()
  const apiKeyTempo = '8850da5459b854e6c2d0749f58598c14';

useEffect(()=>{ 
  if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) =>{
        setLat(position.coords.latitude),
        setLong(position.coords.longitude)
     } )
    }
  },[])
   
 
  useEffect(() => {
    if (lat !== "" && long !== "") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeyTempo}&lang=pt_br`)
            .then((r) => r.json())
            .then((data) => {
                console.log(data.weather[0].main);
        let tempoAtual = data.weather[0].main        
              setTemp(tempoAtual)
              setDescription(data.weather[0].description)
              setTemperatura(parseInt(data.main.temp - 273).toFixed())
           renderizaIcons()
    console.log(data)

            });
    }
}, [lat, long, ]);

function renderizaIcons()  {
  if(temp == 'Clouds'){
return <BsFillCloudsFill />
} else if(temp == 'Rain'){
  return <BsFillCloudRainFill />
} else if(temp == 'Snow'){
  return < BsSnow2/>
} else if( temp == 'Sun'){
  return <BsFillSunFill/>
}
}

  return (
    <div className='app'>
    <div className='container'>
      <div className='row'><p className='img'>{renderizaIcons()}</p></div>
      <div className='row'>{description}</div>
      <div className='row'><p>Temperatura: <strong>{temperatura}Cº</strong></p> </div>

   
    </div>
    </div>
  )
}

export default App
