// api key - 89e3fe4c9f2cf5204d70b1b9bddc97fa
//API 호출 URL - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const APIkey = '89e3fe4c9f2cf5204d70b1b9bddc97fa'
let API = ""
let API2 = ""
let API3 = ""
let CityURL = 'cityList-min.json'
let Datas1, Datas2, Datas3, CityDatas = []

let button  = document.querySelector('.buttonAction')

let Arr = [1, 2, 3]
const getData = async () => {

    try {
        const response = await axios.get(API);
        const response2 = await axios.get(API2);
        const response3 = await axios.get(API3);

        const JsonResponse = await axios.get(CityURL);

        let data = response.data;
        let data2 = response2.data;
        let data3 = response3.data;
        let CityDaTa = JsonResponse.data;


        Datas1 = data;
        Datas2 = data2;
        Datas3 = data3;
        CityDatas = CityDaTa;

        render()
        City()


    } catch (error) {
        console.log(error)
    }
}

const getApi = async () => {

    let url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='
    API = `${url}${APIkey}&q=seoul`;
    API2 = `${url}${APIkey}&q=Daegu`;
    API3 = `${url}${APIkey}&q=Goyang`;

    getData()

}


const render = () => {

    let createHTML = "";
    for (let no = 1; no <= Arr.length; no++) {
        let Datas = (new Function('return ' + `Datas${no}`))();

        for (let i = 0; i < Datas.weather.length; i++) {
            let description = Datas.weather[i].description;
            createHTML += `<article class="weather_item rounded drop-shadow 
            ${((Datas.main.feels_like - 273.15).toFixed(1) >= 25) ? "hot" : ((Datas.main.feels_like - 273.15).toFixed(1) <= 5) ? "cool" : 'soso'}">
        <div class="main_info flex">
            <div class="weather_icon"><i class="fa-solid "></i></div>
            <div class="weather_info flex gap-2">
                <div class="flex centers gap-2"><i class="fa-solid fa-temperature-half"></i> <span>${(Datas.main.feels_like - 273.15).toFixed(1)}℃</span></div>
                <p>${description}</p>
                <p>${(Datas.name == 'Seoul') ? "서울" : (Datas.name == 'Daegu') ? "대구" : (Datas.name == 'Goyang-si') ? "고양" : Datas.name} , ${Datas.sys.country == "KR" ? "한국" : Datas.sys.country}</p>
            </div>
        </div>
        <ul class="sub_info centers flex mx-auto p-5 bg-white">
            <li><i class="fa-solid fa-temperature-arrow-up"><span>${(Datas.main.temp_max - 273.15).toFixed(1)}℃</span></i></li>
            <li><i class="fa-solid fa-temperature-arrow-down"><span>${(Datas.main.temp_min - 273.15).toFixed(1)}℃</span></i></li>
        </ul>
    </article>`
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
            } else if (description == 'broken clouds' || description == 'scattered clouds' || description == 'overcast clouds') {
                icon.classList.add('fa-cloud');
            } else if (description == 'rain' || description == 'shower rain') {
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

/* 상단 메뉴 버튼 */
const City = async () => {

   for  await(const index of CityDatas) {
        if (index.country == 'KR') {
            if (index.name.includes('-do') && !index.name.includes('-dong')) {
            
            }
        }
    }

}

getApi();