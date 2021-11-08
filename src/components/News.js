import React, { useState, useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import Error from './Error.js'


const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalArticles, settotalArticles] = useState(0);
    const [err, seterr] = useState(false);

let capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews = async () => {
   try {

    document.title=`${capitalizeFirstLetter(props.category)}-News Daily`;
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pageSize}`;
    setloading(true);
    props.setProgress(70);
    let data=await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    setarticles(parseddata.articles);
    settotalArticles(parseddata.totalResults);
    setloading(false);
    setpage(page+1);
    props.setProgress(100);
       
   } catch (error) {
      seterr(true);
   }
}

 useEffect(() => {
    updateNews();

 }, [])

  const fetchMoreData = async() => {
    try {

        setpage(page+1);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d840a40156814e65a5614bf16328f2fa&page=${page}&pagesize=${props.pageSize}`;
        let data=await fetch(url);
        let parseddata= await data.json();
        console.log(parseddata);
        setarticles(articles.concat(parseddata.articles));
        settotalArticles(parseddata.totalResults);
        
    } catch (error) {
        seterr(true);
    }
  };

        return (
            
            <div  style={{marginTop:"5rem"}}>
                <h2 className="text-center" style={{margin:'30px 0px'}}>NewsDaily - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
                {loading && <Spinner/>}
                {err && <Error/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalArticles}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row my-4">
                        { articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                    <NewsItem  title={element.title? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage } newsUrl={element.url} author={element.author} date1={element.publishedAt} source={element.source.name} />
                                    </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    
}

export default News

