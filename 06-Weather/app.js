// api key - 89e3fe4c9f2cf5204d70b1b9bddc97fa
//API 호출 URL - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const APIkey = '89e3fe4c9f2cf5204d70b1b9bddc97fa'
let API = `https://api.openweathermap.org/data/2.5/weather?q=seoul,KR&appid=${APIkey}`
let CityJSON = './city.list.json' 
let Datas = []
let City = []


const getData = () => {

    const requestOne = axios.get(API);
    const requestTwo = axios.get(CityJSON);
    
    axios.all([requestOne,requestTwo])
        .then(
            axios.spread((...response) => {
                let data = response[0].data;
                let CityData = response[1].data
               // console.log(data)
               // console.log(CityData)
                Datas = data;
                City = CityData;
                render()
                CityList()
 
            })
        )
        .catch(res => {
            console.log(res)
        })

}

const render = () => {
    let createHTML = "";

    for(let i = 0; i < Datas.weather.length;i++){
     let description =  Datas.weather[i].description   

    createHTML += `<article class="weather_item rounded drop-shadow bg-indigo-400">
    <div class="main_info flex">
        <div class="weather_icon"><i class="fa-solid "></i></div>
        <div class="weather_info flex gap-2">
            <div class="flex centers gap-2"><i class="fa-solid fa-temperature-half"></i> <span>${(Datas.main.feels_like - 273.15).toFixed(1)}℃</span></div>
            <p>${description}</p>
            <p>${Datas.name} , ${Datas.sys.country == "KR" ? "한국" : Datas.sys.country }</p>
        </div>
    </div>
    <ul class="sub_info centers flex mx-auto p-5 bg-white">
        <li><i class="fa-solid fa-temperature-arrow-up"><span>${(Datas.main.temp_max - 273.15).toFixed(1)}℃</span></i></li>
        <li><i class="fa-solid fa-temperature-arrow-down"><span>${(Datas.main.temp_min - 273.15).toFixed(1)}℃</span></i></li>
    </ul>
</article>`
    }
    
    document.querySelector('.weather').innerHTML = createHTML;
    changeWeatherIcon();
}


const changeWeatherIcon = () => {
    let weather_icon = document.querySelector('.weather_icon i')
    for(let i = 0; i < Datas.weather.length;i++){
        let description =  Datas.weather[i].description;
        if(description == 'clear sky') {
            weather_icon.classList.add('fa-sun');
        } else if (description == 'few clouds'){
            weather_icon.classList.add('fa-cloud-sun');
        } else if (description == 'broken clouds' || description == 'scattered clouds'){
            weather_icon.classList.add('fa-cloud');
        } else if (description == 'rain' || description == 'shower rain'){
            weather_icon.classList.add('fa-cloud-rain');
        } else if (description == 'thunderstorm'){
            weather_icon.classList.add('fa-cloud-bolt');
        } else if (description == 'snow') {
            weather_icon.classList.add('fa-snowflake');
        } else if (description == 'mist'){
            weather_icon.classList.add('fa-water');
        }
    }
}

const CityList = () => {
    City.map((i)=>{
        if(i.country == 'KR'){
            if(i.name.includes('-si')){
                API = `https://api.openweathermap.org/data/2.5/weather?q=${i.name},KR&appid=${APIkey}`
                console.log(API)
            }
        }
    });
}


getData()
