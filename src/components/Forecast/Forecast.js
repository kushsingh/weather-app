import React, { useState } from 'react';
import classes from '../Forecast/Forecast.module.css';

import Condition from '../Conditions/Conditions';

const Forcast = () => {
    
    const [responseObj, setResponseObj] = useState({});
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('imperial');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);



    function getForecast(e) {
        e.preventDefault();
        
        if (city.length === 0) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        setLoading(true);

        // weather data fetch function will go here
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "process.env.REACT_APP_API_KEY",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response)
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message)
        });
    }

    return (
        <div>
            <h2>Find Current weather Condition</h2>
            <form onSubmit={getForecast}>
                <input 
                    type="text"
                    placeholder = "EnterCity"
                    maxLength = "50"
                    value = {city}
                    className = {classes.textInput} 
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={classes.Radio}>
                    <input
                        type = "radio"
                        name = "units"
                        checked = {unit === "imperial"} 
                        value = "imperial"
                        onChange = {(e) => setUnit(e.target.value)}
                        />
                        Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
            
                <button className={classes.Button} type="submit">Get Forecast</button>
            </form>
            <Condition responseObj={responseObj} error={error} loading={loading} />
        </div>
    )
}

export default Forcast;