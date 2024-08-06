const passkey="1b6b20bfa3fc7039295aaa9f4191db5c";
const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const weatherCard = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");

const error=document.querySelector(".error");

let showbox1=document.querySelector(".weather");
let showbox2=document.querySelector(".details");

async function checkWeather(city){
    const response=await fetch(apiurl + city + `&appid=${passkey}`);
    
    if(response.status==404){
        error.style.display="block";
        showbox1.style.display="none";
        showbox2.style.display="none";
    }
    else{
        error.style.display="none";
        let data= await response.json();

        let temperature=document.querySelector(".temperature");
        temperature.innerHTML=Math.round(data.main.temp) + "°c";
        let cityname=document.querySelector(".city");
        cityname.innerHTML=data.name;
        let humidity=document.querySelector(".humidity");
        humidity.innerHTML=data.main.humidity + " %";
        let wind=document.querySelector(".wind");
        wind.innerHTML=data.wind.speed + " km/h";

        updateBackground(data.weather[0].main);

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="./clouds.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src="./rain.png";
        }
        else if(data.weather[0].main=="Snow"){
            weatherIcon.src="./snow.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src="./mist.png";
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src="./drizzle.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src="./clear.png";
        }

        showbox1.style.display="block";
        showbox2.style.display="flex";
    }
    
    
}

searchbtn.addEventListener("click" , ()=>{

    checkWeather(searchbox.value);

})

function updateBackground(condition) {
    let gradient;
    switch (condition) {
      case 'Clear':
        gradient = 'linear-gradient(135deg, #FFCC70 0%, #FFD700 100%)'; // Brighter yellow gradient for clear weather
        break;
      case 'Rain':
        gradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'; // Dark blue gradient for rainy weather
        break;
      case 'Clouds':
        gradient = 'linear-gradient(135deg, #7d7e80 0%, #b5b6b8 100%)'; // Darker gray gradient for cloudy weather
        break;
      case 'Snow':
        gradient = 'linear-gradient(135deg, #9bb5c0 0%, #d2e4ef 100%)'; // Medium blue gradient for snowy weather
        break;
      case 'Mist':
        gradient = 'linear-gradient(135deg, #5d6c76 0%, #a1b1bd 100%)'; // Darker gray gradient for misty weather
        break;
      case 'Drizzle':
        gradient = 'linear-gradient(135deg, #75a7d2 0%, #b0d1f7 100%)'; // Medium blue gradient for drizzly weather
        break;
    }
    weatherCard.style.background = gradient;
}

  

