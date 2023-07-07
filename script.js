const form = document.getElementById("form")
const button = document.querySelector("#button")
const cityInput = document.querySelector("#cityInput")
const weatherDiv = document.querySelector(".weatherDiv")
const derece = document.querySelector("#derece")
const hissedilen = document.querySelector("#hissedilen")
const nem = document.querySelector("#nem")
const ruzgar = document.querySelector("#ruzgar")
const iconWeather = document.querySelector("#iconWeather")
const il = document.getElementById("il")

const options = {
    method: "GET",
    headers:{
        'X-Api-Key':"bc07101efe2066144c26ed23d7bc4e04"
    }
}

function veriYazdırma(data){
    weatherDiv.classList.remove("d-none")
    const havaSıcaklık = data.main.temp - 273.15;
    const hissedilenSıcaklık = data.main.feels_like - 273.15;
    const nemOrani = data.main.humidity; 
    const ruzgarSpeed = data.wind.speed;
    const iconID = data.weather[0].icon;

    il.textContent = cityInput.value.toUpperCase();
    derece.textContent = `${havaSıcaklık.toFixed(0)}°C`
    hissedilen.textContent = `Hissedilen: ${hissedilenSıcaklık.toFixed(0)}°C`
    nem.textContent = `Nem Oranı: ${nemOrani}%`
    ruzgar.textContent = `Rüzgar: ${ruzgarSpeed} m/s`
    iconWeather.innerHTML = `<img src="http://openweather.org/img/wn/${iconID}.png" alt="Weatherİcon">`
}

async function getWeather(){

        let cityValue = cityInput.value;
        const apiKey = "bc07101efe2066144c26ed23d7bc4e04"
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`)
        const data = await response.json();
        if(response.status==200){
            console.log(data)
            veriYazdırma(data)
        }else{
            alert("Şehir İsmi Bulunamadı!!!")
            cityInput.value = ""
            weatherDiv.classList.add("d-none")
        }
}

button.addEventListener("click",getWeather)
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    getWeather();
})
