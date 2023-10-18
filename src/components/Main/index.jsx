import { useState, useEffect } from "react";
import './main.css';
import { FaCloudSun, FaSun } from 'react-icons/fa';


function Main() {
    const [cep, setCep] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [temp, setTemp] = useState("");

    const apiKey = '2441a36e15c2473995ca043491a2dc3b';
    const apiKeyTempo = '8850da5459b854e6c2d0749f58598c14';
    let icon = ''

    const buscaLatLong = () => {
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apiKey}`)
            .then((r) => r.json())
            .then((resposta) => {
                let latLong = resposta.results;
                setLat(latLong[0].geometry.lat);
                setLong(latLong[0].geometry.lng);
            });
    }

    useEffect(() => {
        if (lat !== "" && long !== "") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeyTempo}`)
                .then((r) => r.json())
                .then((data) => {
                    console.log(data.main.temp);
                    setTemp(data.main.temp);
                    pegaIcons()
                    console.log(data)
                });
        }
    }, [lat, long]);

    let result = parseInt(temp);
    result = result.toFixed();
    const pegaIcons = () => {
        if (result < 20 + 273) {
           // Use o ícone do React Icons aqui
            return <FaCloudSun />
        }  else if (result > 18 + 273) {
            return <FaSun />
        }
    }
                    pegaIcons()

    console.log(icon)

    return (
        <div className="w-100 h-100 app">
            <div className="row d-flex">
                <input type="number" onChange={(e) => setCep(e.target.value)} placeholder="seu cep" required />
                <button className="btn btn-success" onClick={buscaLatLong}>Enviar</button>
            </div>
            <div className="row">
                <p>{pegaIcons()} {result - 273}ºC</p>
            </div>
        </div>
    )
}

export default Main;
