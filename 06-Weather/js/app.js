// api key - 89e3fe4c9f2cf5204d70b1b9bddc97fa
//API 호출 URL - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const APIkey = '89e3fe4c9f2cf5204d70b1b9bddc97fa';
let url = "";
let API = "";
let Datas, Arr = [];
let DatasList = [];
let FilterList = [];
const CityArr = [
    { City: "Seoul", name: '서울', done: false },
    { City: "Gyeonggi-do", name: '경기도', done: true },
    { City: "Gangwon-do", name: '강원도', done: true },
    { City: "Chungcheongbuk-do", name: '충청북도', done: true },
    { City: "Chungcheongnam-do", name: '충청남도', done: true },
    { City: "Jeollabuk-do", name: '전라북도', done: true },
    { City: "Jeollanam-do", name: '전라남도', done: true },
    { City: "Gyeongsangbuk-do", name: '경상북도', done: true },
    { City: "Gyeongsangnam-do", name: '경상남도', done: true },
    { City: "Jeju-do", name: '제주도', done: true },
];

let page = 1
const totalCount = 10
const pageCount = 3
const limit = 3
//const offset = (page-1) * limit

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
        DatasList.push(Datas)

        FilterList = DatasList.filter((item, i) => {
            return (
                DatasList.findIndex((item2, j) => {
                    return item.id === item2.id;
                }) === i
            );
        });
    
        render()
        pagelation()
    } catch (error) {
        console.log(error)
    }
}



const getApi = async () => {

    url = await 'https://api.openweathermap.org/data/2.5/weather?&appid='
    CityArr.map((num) => {
        API = `${url}${APIkey}&q=${num.City}`;
        getData()
    })

    
}


const render = () => {
    try {
        let list = FilterList;
        let createHTML = ""; 
 

  
        createHTML = list.slice(((page-1) * limit), ((page-1) * limit) + limit).map((list, i) => {
            let description = list.weather[0].description;
            return `<article class="weather_item rounded drop-shadow overflow-hidden
            ${((list.main.feels_like - 273.15).toFixed(1) >= 20) ? "hot" : ((list.main.feels_like - 273.15).toFixed(1) <= 5) ? "cool" : 'soso'}">
        <div class="main_info flex" >
            <div class="weather_icon"><i class="fa-solid "></i></div>
            <div class="weather_info flex gap-2">
                <div class="flex centers gap-2"><i class="fa-solid fa-temperature-half"></i> <span>${(list.main.feels_like - 273.15).toFixed(1)}℃</span></div>
                <p>${description}</p>
                <p class="weatherCity"> ${list.name}  , ${list.sys.country == "KR" ? "한국" : list.sys.country}</p>
            </div>
        </div>
        <ul class="sub_info centers flex mx-auto p-5 bg-white">
            <li><i class="fa-solid fa-temperature-arrow-up"><span>${(list.main.temp_max - 273.15).toFixed(1)}℃</span></i></li>
            <li><i class="fa-solid fa-temperature-arrow-down"><span>${(list.main.temp_min - 273.15).toFixed(1)}℃</span></i></li>
        </ul>
    
    </article>
    `
        }).join('');
        document.querySelector('.weather').innerHTML = createHTML;
        changeWeatherIcon();

    } catch (error) {
        console.log(error.message);
        errorRender(error.message)
    }

}


/* 날씨 아이콘 변경 */
const changeWeatherIcon = () => {
    let list = FilterList;
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

/* 버튼 
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
} */


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
    let totalPage = Math.ceil(totalCount / limit)
    let pageGroup = Math.ceil(page / pageCount)

    let last = pageGroup * pageCount;
    if (last > totalPage) {
        // 마지막 그룹이 5개 이하이면
        last = totalPage;
    }
    let first = last - (pageCount - 1); 

    pageNationHTML = page == 1 ? "" : `<li class=" bg-indigo-500 shadow-lg py-1 px-4 shadow-indigo-500/50 py-2 rounded hover:bg-white hover:text-indigo-500" onClick="moveTo(${page-1})">&lt</li>`

    for (let i = first; i <= last; i++) {
        pageNationHTML += `
    <li class="${page == i ? 'active' : ""} bg-indigo-500 shadow-lg py-1 px-4 shadow-indigo-500/50 p-2 py-2 rounded hover:bg-white hover:text-indigo-500" onClick="moveTo(${i})">${i}</li>
    `
    }

    pageNationHTML += page == totalPage ? "" : page >= 1 ? `<li class=" bg-indigo-500 shadow-lg py-1 px-4 shadow-indigo-500/50 py-2 rounded hover:bg-white hover:text-indigo-500" onClick="moveTo(${page+1})">&gt</li>` : ""
    document.querySelector('.pagination').innerHTML = pageNationHTML;

}

const moveTo = (pageNum) => {
    page = pageNum;

    getData()
}

getApi();