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


/* api */
const getLatestNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`); // js 내장 클래스 new URL()
    let header = new Headers({ 'x-api-key': 'tlfAWwOpBrAQQa3g6LQ5f-a_9E3txFZcgrw2oJx1i_0' }); // js 내장 클래스 new Headers({})

    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news)
    render()
}
getLatestNews()

function render() {
    let newsHTML = "";
    newsHTML = news.map((newsItem) => {
        return `<div class="row news">
        <div class="col-lg-4">   
            <img class="news-img-size" src="${
                newsItem.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt="">
        </div>
        <div class="col-lg-8 news-content">
            <h2>${newsItem.title}</h2>
            <P>
                ${
                    newsItem.summary == "null" ||  newsItem.summary == "" ? "내용없음" :  newsItem.summary.length > 200 ? newsItem.summary.substring(0,200) + "..." : newsItem.summary
                }
            </P>
            <div class="source-dey">
            ${newsItem.rights||"no Soucre"} * ${
                moment(newsItem.published_date).fromNow()
            }
            </div>
        </div>
    </div>
    `
    }).join('');

    document.querySelector('.body_wrap').innerHTML = newsHTML;

}
