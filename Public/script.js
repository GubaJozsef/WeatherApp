const cities = [
    {name: "Budapest", lat: 47.4979, long: 19.0402},
    { name: "Debrecen", lat: 47.5316, lon: 21.6273 },
    { name: "Szeged", lat: 46.2530, lon: 20.1414 },
    { name: "Miskolc", lat: 48.1035, lon: 20.7784 },
    { name: "Pécs", lat: 46.0727, lon: 18.2323 },
    { name: "Győr", lat: 47.6875, lon: 17.6504 },
    { name: "Nyíregyháza", lat: 47.9556, lon: 21.7167 },
    { name: "Kecskemét", lat: 46.8964, lon: 19.6897 },
    { name: "Székesfehérvár", lat: 47.1860, lon: 18.4221 },
    { name: "Szombathely", lat: 47.2307, lon: 16.6218 }
];
// Populate the city dropdown
const cityDropdown = document.getElementById('city');

cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = city.name;

    cityDropdown.appendChild(option);
});

//Handle form submission
const form = document.getElementById('weather-form');

form.addEventListener('submit', async (event) => {
    //Do not reflesh page
    event.preventDefault();

    const cityName = document.getElementById('city').value;
    const date  = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;

    //console.log(cityName, date, hour);
    //Find the selected city's coordinates
    const selectedCity = cities.find((city) => city.name === cityName); 

    //console.log(selectedCity);
    if(!selectedCity) {
        alert('Please select a valid city');
        return;
    }

    const {lat, lon} = selectedCity;

    //TODO perform code to the API 
    //Fech weather data from Open Meteo API
    try{ 
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&hourly=temperature_2m,precipitation,windspeed_10m`
            
        );
        //response.temprature;
        const data = await response.json();
        console.log(data);
    }
    catch{
        console.error("Error fetching weather data:", error);
        alert("Failed");
    }
    

    //Set the weather data
    const temprature = document.getElementById('temprature');
    temprature.textContent= 'Templerature: 10 C';

    const wind = document.getElementById('wind');
    wind.textContent= '1 km/h';

    const precipitation = document.getElementById('precipitation');
    precipitation.textContent= '100mm';

    //random temporary code


});


