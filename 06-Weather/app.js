// api key - 89e3fe4c9f2cf5204d70b1b9bddc97fa
//API 호출 URL - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const APIkey = '89e3fe4c9f2cf5204d70b1b9bddc97fa'
let url = ""
let API = ""

let Datas1, Arr = []

let button = document.querySelectorAll('.buttonAction')
let closeBtn = document.querySelectorAll('.closeBtn');



const getData = async () => {

    try {
        const response = await axios.get(API);

        let data = response.data;
        Arr.push(API)
        Datas1 = data;
        render()

    } catch (error) {
        console.log(error)
    }
}

button.forEach((i) => {
    i.addEventListener('click', (event) => menuButton(event))
});


const getApi = async () => {

    url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='
    API = `${url}${APIkey}&q=seoul`;

    getData()

}


const render = () => {
    let list = [];
    let createHTML = "";
    list = Arr;

    for (let no = 1; no <= list.length; no++) {
        let Datas = (new Function('return ' + `Datas1`))();

        for (let i = 0; i < Datas.weather.length; i++) {
            let description = Datas.weather[i].description;
            createHTML += `<article class="weather_item rounded drop-shadow 
            ${((Datas.main.feels_like - 273.15).toFixed(1) >= 25) ? "hot" : ((Datas.main.feels_like - 273.15).toFixed(1) <= 5) ? "cool" : 'soso'}">
        <div class="main_info flex">
            <div class="weather_icon"><i class="fa-solid "></i></div>
            <div class="weather_info flex gap-2">
                <div class="flex centers gap-2"><i class="fa-solid fa-temperature-half"></i> <span>${(Datas.main.feels_like - 273.15).toFixed(1)}℃</span></div>
                <p>${description}</p>
                <p class="weatherCity"> ${Datas.name}  , ${Datas.sys.country == "KR" ? "한국" : Datas.sys.country}</p>
            </div>
        </div>
        <ul class="sub_info centers flex mx-auto p-5 bg-white">
            <li><i class="fa-solid fa-temperature-arrow-up"><span>${(Datas.main.temp_max - 273.15).toFixed(1)}℃</span></i></li>
            <li><i class="fa-solid fa-temperature-arrow-down"><span>${(Datas.main.temp_min - 273.15).toFixed(1)}℃</span></i></li>
        </ul>
        <div class="closeBtn"><i class="fa-solid fa-x"></i></div>
    </article>
    `
        }
    }

    document.querySelector('.weather').innerHTML = createHTML;
    changeWeatherIcon();
}


/* 날씨 아이콘 변경 */
const changeWeatherIcon = () => {
    let weather_icon = document.querySelectorAll('.weather_icon i');
    weather_icon.forEach(icon => {
        for (let i = 0; i < Datas1.weather.length; i++) {
            let description = Datas1.weather[i].description;
            if (description == 'clear sky') {
                icon.classList.add('fa-sun');
            } else if (description == 'few clouds') {
                icon.classList.add('fa-cloud-sun');
            } else if (description.includes('clouds') || !(description == 'few clouds')) {
                icon.classList.add('fa-cloud');
            } else if (description.includes('rain')) {
                icon.classList.add('fa-cloud-rain');
            } else if (description == 'thunderstorm') {
                icon.classList.add('fa-cloud-bolt');
            } else if (description == 'snow') {
                icon.classList.add('fa-snowflake');
            } else if (description == 'mist') {
                icon.classList.add('fa-water');
            }
        }
    });

}


const menuButton = async (event) => {
    let thisButton = event.target;
    url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='

    if (thisButton.innerText == '경기도') {
        API = `${url}${APIkey}&q=Gyeonggi-do`;
    } else if (thisButton.innerText == '강원도') {
        API = `${url}${APIkey}&q=Gangwon-do`;
    } else if (thisButton.innerText == '충청북도') {
        API = `${url}${APIkey}&q=Chungcheongbuk-do`;
    } else if (thisButton.innerText == '충청남도') {
        API = `${url}${APIkey}&q=Chungcheongnam-do`;
    } else if (thisButton.innerText == '전라북도') {
        API = `${url}${APIkey}&q=Jeollabuk-do`;
    } else if (thisButton.innerText == '전라남도') {
        API = `${url}${APIkey}&q=Jeollanam-do`;
    } else if (thisButton.innerText == '경상북도') {
        API = `${url}${APIkey}&q=Gyeongsangbuk-do`;
    } else if (thisButton.innerText == '경상남도') {
        API = `${url}${APIkey}&q=Gyeongsangnam-do`;
    } else if (thisButton.innerText == '제주도') {
        API = `${url}${APIkey}&q=Jeju-do`;
    } else {
        API = `${url}${APIkey}&q=Seoul`;
    }

    getData()
}


getApi();