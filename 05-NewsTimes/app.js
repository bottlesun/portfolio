/*
지금 현재 상단에 sport, tech, world등 카테고리들이 쭉~있다. 카테고리중 하나를 클릭하면 그 카테고리에 있는 뉴스를 어떻게 검색할까? 고민해보고 미리 코드를 짜보자!

힌트! API 문서 속 query 를 잘보자! 👀
https://docs.newscatcherapi.com/api-docs/endpoints/latest-headlines
카테고리로 검색할 수 있는 url만 잘 갖추면 나머지 url호출하고 화면에 보여주는건 똑같다.
*/


/* m_menu event */
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};



let news = [];
let ThisMenus = document.querySelectorAll('.menus button')
let thisValue = ''
let searchBtn = document.querySelector('.search-button');
let url = ''
ThisMenus.forEach(menu => menu.addEventListener('click', (event) => getNewsByTopic(event)));


// 각 함수에서 필요한 url을 만든다.
// api 호출 함수를 부른다.
const getNews = async () => {
    try {
        let header = new Headers({ 'x-api-key': 'tlfAWwOpBrAQQa3g6LQ5f-a_9E3txFZcgrw2oJx1i_0' }); // js 내장 클래스 new Headers({})
        let response = await fetch(url, { headers: header });
        let data = await response.json();
        if (response.status == 200) {
            if(data.total_hits == 0){
                throw new Error('검색된 결과값이 없습니다.');
            }
            news = data.articles;
            console.log(news);
            render();
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        console.log('잡힌에러는', error.message);
        errorRender(error.message);
    }

}


/* api */
const getLatestNews = async () => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`); // js 내장 클래스 new URL()
    getNews()
}

const getNewsByTopic = async (event) => {
    console.log('클릭됨', event.target.textContent);
    let topic = event.target.textContent.toLowerCase()
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`);
    getNews()
}

const getNewsByKeyWord = async () => {
    // 검색키워드 읽어오기
    // url에 검색 키워드 넣기
    // 헤더 준비
    // url 부르기
    // 데이터 가지고 오기
    // 데이터 보내기

    let keyWord = document.querySelector('#search-input').value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyWord}&countries=KR&page_size=10`);

    getNews()
}

function render() {
    //topic
    let newsHTML = "";
    newsHTML = news.map((newsItem) => {
        return `<div class="row news">
        <div class="col-lg-4">   
            <img class="news-img-size" src="${newsItem.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt="">
        </div>
        <div class="col-lg-8 news-content">
            <h2>${newsItem.title}</h2>
            <P>
                ${newsItem.summary == "null" || newsItem.summary == "" ? "내용없음" : newsItem.summary.length > 200 ? newsItem.summary.substring(0, 200) + "..." : newsItem.summary
            }
            </P>
            <div class="source-dey">
            ${newsItem.rights || "no Source"} * ${moment(newsItem.published_date).fromNow()
            }
            </div>
        </div>
    </div>
    `
    }).join('');

    document.querySelector('.body_wrap').innerHTML = newsHTML;

}


searchBtn.addEventListener('click', getNewsByKeyWord);

const errorRender = (message) => {
    let errorHTML = `
    <div class="alert alert-danger text-center" role="alert">
  ${message}
</div>
    `;
    document.querySelector('.body_wrap').innerHTML = errorHTML;
}


getLatestNews()