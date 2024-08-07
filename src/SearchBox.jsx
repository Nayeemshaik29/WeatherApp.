import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import "./index.css"
import { pink } from '@mui/material/colors';

export default function SearchBox({updateInfo}){
    let [city , setCity] = useState("");
    let [error , setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "37890e39bf040137b48cde494869a1d8" ;
    
    let getWeatherInfo = async() =>{
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                temp : jsonResponse.main.temp,
                feelslike : jsonResponse.main.feels_like,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                wind : jsonResponse.wind.speed,
                name : jsonResponse.name,
                country : jsonResponse.sys.country,
                weather : jsonResponse.weather[0].description,
                icon : jsonResponse.weather[0].icon
            }
            console.log(result);
            return result;
        }catch(err){
            throw err;
            return alert("Search for valid city name !!");
        }
       
    }

    let handleChange = (event) =>{
        setCity(event.target.value);
    }

    let handleSubmit = async(event) =>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo =await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
        
    }


    return(
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
            <TextField
  id="city"
  label="City Name"
  variant="outlined"
  required
  value={city}
  onChange={handleChange}
  className='search'
  sx={{ 
    '& .MuiInputBase-input': {
      color: 'white'
    }
  }}
/>
             <br /> <br />
            <Button className='button' variant="contained" type='submit' >Send</Button>
            {error && <p style={{color:"red"}}> Failed to fetch weather data. Please try again!! </p> }   
            </form>
        </div>
    );
}