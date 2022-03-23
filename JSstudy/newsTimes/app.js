/* api */
let news = []
const getLatestNews = async() =>{
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`); // js 내장 클래스 new URL()
    let header = new Headers({'x-api-key':'tlfAWwOpBrAQQa3g6LQ5f-a_9E3txFZcgrw2oJx1i_0'}); // js 내장 클래스 new Headers({})

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles;
}
getLatestNews()