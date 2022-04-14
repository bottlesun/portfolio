/* 닫기 
const Clicks = async (id) => {
    FilterList;
    for (let i = 0; i < FilterList.length; i++) {
        if (FilterList[i].id == id) {
            FilterList.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < CityArr.length; i++) {
        CityArr[i].done = true;
    }
    render();
    pagelation();
} */


  //    <div class="closeBtn" onclick="Clicks(${list.id})"><i class="fa-solid fa-x"></i></div>



  /* 버튼 중복 검사
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
  */