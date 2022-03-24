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
            <img class="news-img-size" src="${newsItem.media}" alt="">
        </div>
        <div class="col-lg-8 news-content">
            <h2>${newsItem.title}</h2>
            <P>
                ${newsItem.summary}
            </P>
            <div class="source-dey">
            ${newsItem.rights} * ${newsItem.published_date}
            </div>
        </div>
    </div>
    `
    }).join('');

    document.querySelector('.body_wrap').innerHTML = newsHTML;

}
