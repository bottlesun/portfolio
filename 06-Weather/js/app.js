// api key - 89e3fe4c9f2cf5204d70b1b9bddc97fa
//API 호출 URL - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const APIkey = '89e3fe4c9f2cf5204d70b1b9bddc97fa';
let url = "";
let API = "";
let Datas, Arr = [];
let DatasList = [];
let CityArr = [
    { City: "Gyeonggi-do", name: '경기도', done: true },
    { City: "Gangwon-do", name: '강원도', done: true },
    { City: "Chungcheongbuk-do", name: '충청북도', done: true },
    { City: "Chungcheongnam-do", name: '충청남도', done: true },
    { City: "Jeollabuk-do", name: '전라북도', done: true },
    { City: "Jeollanam-do", name: '전라남도', done: true },
    { City: "Gyeongsangbuk-do", name: '경상북도', done: true },
    { City: "Gyeongsangnam-do", name: '경상남도', done: true },
    { City: "Jeju-do", name: '제주도', done: true },
    { City: "Seoul", name: '서울', done: false },
];


let page = 1;
let totalPage = 0;

let button = document.querySelectorAll('.buttonAction')
let closeBtn = document.querySelectorAll('.closeBtn');


button.forEach((i) => {
    i.addEventListener('click', (event) => menuButton(event))
});

const getData = async () => {

    try {
        const response = await axios.get(API);

        let data = response.data;
        Datas = data;
        DatasList.unshift(Datas)

        render()
        pagelation()
    } catch (error) {
        console.log(error)
    }
}



const getApi = async () => {

    url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='
    API = `${url}${APIkey}&q=seoul`;
    getData()
    console.log(API)
}


const render = () => {
    try {
        let list = DatasList;
        let createHTML = "";
        for (let no = 0; no < list.length; no++) {

            for (let i = 0; i < list[no].weather.length; i++) {
                let description = list[no].weather[i].description;
                createHTML += `<article class="weather_item rounded drop-shadow overflow-hidden
                ${((list[no].main.feels_like - 273.15).toFixed(1) >= 20) ? "hot" : ((list[no].main.feels_like - 273.15).toFixed(1) <= 5) ? "cool" : 'soso'}">
            <div class="main_info flex" >
                <div class="weather_icon"><i class="fa-solid "></i></div>
                <div class="weather_info flex gap-2">
                    <div class="flex centers gap-2"><i class="fa-solid fa-temperature-half"></i> <span>${(list[no].main.feels_like - 273.15).toFixed(1)}℃</span></div>
                    <p>${description}</p>
                    <p class="weatherCity"> ${list[no].name}  , ${list[no].sys.country == "KR" ? "한국" : list[no].sys.country}</p>
                </div>
            </div>
            <ul class="sub_info centers flex mx-auto p-5 bg-white">
                <li><i class="fa-solid fa-temperature-arrow-up"><span>${(list[no].main.temp_max - 273.15).toFixed(1)}℃</span></i></li>
                <li><i class="fa-solid fa-temperature-arrow-down"><span>${(list[no].main.temp_min - 273.15).toFixed(1)}℃</span></i></li>
            </ul>
            <div class="closeBtn" onclick="Clicks(${list[no].id})"><i class="fa-solid fa-x"></i></div>
        </article>
        `
            }
        }
        document.querySelector('.weather').innerHTML = createHTML;
        changeWeatherIcon();
    } catch (error) {
        console.log(error.message);
        errorRender(error.message)
    }

}


/* 날씨 아이콘 변경 */
const changeWeatherIcon = () => {
    let list = DatasList;
    let weather_icon = document.querySelectorAll('.weather_icon i');
    weather_icon.forEach((icon, v) => {
        for (let i = 0; i < list[v].weather.length; i++) {
            let description = list[v].weather[i].description;
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

/* 버튼 */
const menuButton = async (event) => {

    let CityName = CityArr;

    let thisButton = event.target;
    url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='

    for (let i = 0; i < CityName.length; i++) {
        if (CityName[i].done) {
            if (thisButton.innerText == CityName[i].name) {
                API = `${url}${APIkey}&q=${CityName[i].City}`;
                getData();
                return CityName[i].done = false
            }
        } else {
            console.log('중복')
        }
    }
}

/* 닫기 */
const Clicks = async (id) => {
    DatasList;
    for (let i = 0; i < DatasList.length; i++) {
        if (DatasList[i].id == id) {
            DatasList.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < CityArr.length; i++) {
        CityArr[i].done = true;
    }
    render();
    pagelation();
}

const errorRender = (error) => {
    let errorHTML = `
    <div class="alert  text-center" role="alert">
  ${error}
</div>
    `
    document.querySelector('section').innerHTML = errorHTML;
}


/* pagelation */
const pagelation = () => {
    let pageNationHTML = "";
    let pageGroup = Math.ceil(Datas.length / 3);
    let last = pageGroup * 3;
    if (last > totalPage) {
        // 마지막 그룹이 5개 이하이면
        last = totalPage;
      }

    for (let i = 1; i <= totalPage; i++) {
        pageNationHTML += `
    <li class="${page == i ? 'active' : ""} bg-indigo-500 shadow-lg py-1 px-4 shadow-indigo-500/50 p-2 py-2 rounded hover:bg-white hover:text-indigo-500" onClick="moveTo(${i})">${i}</li>
    `
    }
    document.querySelector('.pagination').innerHTML = pageNationHTML;

}

const moveTo = (pageNum) => {
    page = pageNum;
    console.log(page)
    getData()
}

getApi();