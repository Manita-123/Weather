
const inputBox = document.querySelector(".inputBox");
const form = document.querySelector("#sForm");
const weatherImg = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const feelLike = document.querySelector("#feel-like");
const windDir = document.querySelector("#wind-dir");
const uv = document.querySelector("#uv");
const visInKm = document.querySelector("#vis-in-km");
const lastUpdate = document.querySelector(".last-update")

const h3 = document.querySelector(".about");
const weatherBody = document.querySelector(".weather-body");

const dayName = (date, locale) => date.toLocaleDateString(locale, { weekday: 'long' });

let day = dayName(new Date());;

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    let newValue = inputBox.value.trim();
    let oldValue = sessionStorage.getItem("lastInput");

    // Check if same value
    if (oldValue && oldValue.toLowerCase() === newValue.toLowerCase()) {
        console.log("Same value, API call prevented");
        return;
    }

    // Store new value
    sessionStorage.setItem("lastInput", newValue);

    // Call API only if value is different
    checkWeather(newValue);
});

function checkWeather(city){
    const url = `https://api.weatherapi.com/v1/current.json?key=00d9fac9fa5d462d9b591310261602&q=${city}`;

    fetch(url).then(i => i.json()).then(i => {
        try{
        console.log(i);
        inputBox.innerHTML = "";
        
        weatherBody.style.display ="flex";

        h3.innerHTML = `${i.location.name} , ${i.location.country}`;
        document.querySelector(".day").innerHTML = day;

        temp.innerHTML = `${i.current.temp_c}<sup>°C</sup>`;

        desc.innerHTML = `${i.current.condition.text}`;

        humidity.innerHTML = `${i.current.humidity}`;
        feelLike.innerHTML = `${i.current.feelslike_c} <sup>°C</sup>`;
        windDir.innerHTML = `${i.current.wind_dir}`;
        uv.innerHTML = `${i.current.uv}`;
        visInKm.innerHTML = `${i.current.vis_km}`;
        windSpeed.innerHTML = `${i.current.wind_kph} Kp/H`;

        weatherImg.src = `https:${i.current.condition.icon}`;

        lastUpdate.innerHTML = ` Last Updated: ${i.current.last_updated}`;
        }
        catch(err){
            console.warn("Fetch failed");
        }

    });
};

