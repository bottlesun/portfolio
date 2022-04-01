

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
let page = 1;
let total_page = 0;
let ThisMenus = document.querySelectorAll('.menus button')
let thisValue = ''
let searchBtn = document.querySelector('.search-button');
let url = ''
ThisMenus.forEach(menu => menu.addEventListener('click', (event) => getNewsByTopic(event)));


// 각 함수에서 필요한 url을 만든다.
// api 호출 함수를 부른다.
const getNews = async () => {
    try {
        let header = new Headers({ 'x-api-key': '_qVxIzNwLHOqrTwfnuU3wDORoiUxTW0Y2mVlB9frCb8' }); // js 내장 클래스 new Headers({})
        //tW8owYAyg01t9XS_JJ9f8R37c2cEzH8dOcZ0A5zeYOI ->API mr_k00
        //tlfAWwOpBrAQQa3g6LQ5f-a_9E3txFZcgrw2oJx1i_0 ->API krr1996
        //_qVxIzNwLHOqrTwfnuU3wDORoiUxTW0Y2mVlB9frCb8 -> API bskim

        url.searchParams.set('page', page); // &page=
        let response = await fetch(url, { headers: header });
        let data = await response.json();
        if (response.status == 200) {
            if (data.total_hits == 0) {
                throw new Error('검색된 결과값이 없습니다.');
            }
            console.log('데이터', data)
            news = data.articles;
            total_page = data.total_pages;
            page = data.page;
            console.log(news);
            render();
            pageNation();
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


const errorRender = (message) => {
    let errorHTML = `
    <div class="alert alert-danger text-center" role="alert">
  ${message}
</div>
    `;
    document.querySelector('.body_wrap').innerHTML = errorHTML;
}

const pageNation = () => {
    let pageNationHTML = ``;
    let pageGroup = Math.ceil(page / 5);
    let last = pageGroup * 5;
    if (last > total_page) {
      // 마지막 그룹이 5개 이하이면
      last = total_page;
    }
    let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면
    // first ~ last 페이지 프린트

    //total page 3일 경우 3개의 페이지만 프린트 하는법 last, first 
    //<< >> 버튼 만들어주기 맨 처음 맨 끝으로 가는 버튼 만들기 
    // 내가 그룹 1일때, << < 버튼이 없다
    // 내가 마지막 그룹일떄 > >> 버튼이 없다


    pageNationHTML = page == 1 ? "" : 
    `
    ${
        page >= false + 1 ? `<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onClick="moveToPage(${false})">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>` : ""
    }
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onClick="moveToPage(${page-1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>
  `
    for (let i = first; i <= last; i++) {
        pageNationHTML += `
        <li class="page-item ${page == i ? 'active' : ""}"><a class="page-link " href="javascript:void(0)" onClick="moveToPage(${i})">${i}</a></li>
        `
    }

    pageNationHTML += page == total_page ? "" :  `
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onClick="moveToPage(${page+1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li>
  ${
    page <= total_page - 1 ? `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onClick="moveToPage(${total_page})">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>` : ""
}
`

    document.querySelector('.pagination').innerHTML = pageNationHTML;

}

const moveToPage = (pageNum) => {
    //1. 이동하고싶은 페이지 알기
    page = pageNum;
    console.log(page)
    //2. 이동하고싶은 페이지를 가지고 API를 재호출
    getNews()
}

searchBtn.addEventListener('click', getNewsByKeyWord);

getLatestNews()