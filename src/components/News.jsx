import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const updateNews = async () => {
  props.setProgress(10);
  let nextPage = 1;
  const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=in&max=10&apikey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
  console.log("Fetching URL:", url);
  setLoading(true);

  try {
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    if (parsedData.articles && parsedData.articles.length > 0) {
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } else {
      console.warn("API returned no data, using fallback");
      setArticles(fallbackData.articles);
      setTotalResults(fallbackData.totalArticles);
    }
  } catch (error) {
    console.error("API fetch failed, using fallback", error);
    setArticles(fallbackData.articles);
    setTotalResults(fallbackData.totalArticles);
  }

  setLoading(false);
  props.setProgress(100);
};

// Put your fallback data here
const fallbackData = {
  totalArticles: 377320,
  articles: [
    {
      id: "4df00c8825025b50e429fa47b632816b",
      title: "A 45-foot asteroid will pass very close to Earth today, NASA alerts",
      description:
        "A small asteroid will pass relatively close to Earth, highlighting the importance of global tracking and research.",
      url: "https://www.moneycontrol.com/science/a-45-foot-asteroid-will-pass-very-close-to-earth-today-nasa-alerts-article-13593431.html",
      image:
        "https://images.moneycontrol.com/static-mcnews/2025/07/20250721122531_Sheetal-Kumari-fi.jpg",
      publishedAt: "2025-10-02T01:30:54Z",
      source: { name: "Moneycontrol" }
    },
    {
      id: "e3c6da741fa454fa710726518fe9e1e2",
      title:
        "AB de Villiers slams India's stand of not accepting Asia Cup trophy",
      description: "Politics should stay aside – ABD on Asia Cup chaos.",
      url: "https://www.hindustantimes.com/cricket/ab-de-villiers...",
      image:
        "https://www.hindustantimes.com/ht-img/img/2025/10/02/1600x900/logo/PTI05-31-2025-000068B-0_1750221942577_1759366879668.jpg",
      publishedAt: "2025-10-02T01:12:16Z",
      source: { name: "Hindustan Times" }
    },
    {
      id: "665fa5502861478d3f1a85885f6803a6",
      title:
        "Pakistan Army chief Asim Munir mocked for showcasing ‘rare earth minerals’ to Trump: ‘What a joke’",
      description:
        "Pakistani senator Aimal Wali Khan accused Asim Munir of behaving 'like a salesman' while Shehbaz Sharif looked on 'like a manager'.",
      url: "https://www.hindustantimes.com/world-news/pakistan-army-chief-asim-munir-mocked-for-showcasing-rare-earth-minerals-to-trump-what-a-joke-101759368202063.html",
      image:
        "https://www.hindustantimes.com/ht-img/img/2025/10/02/1600x900/logo/asim_munir_1759369668693_1759369682097.jpg",
      publishedAt: "2025-10-02T01:51:12Z",
      source: { name: "Hindustan Times" }
    },
    {
      id: "e73f34d836225190d3b09df497e5b3ff",
      title:
        "Madhya Pradesh: Teacher, wife bury newborn alive over 2-child policy fear; baby survives, couple booked",
      description:
        "A government school teacher and his wife in Madhya Pradesh allegedly buried their three-day-old son alive, fearing job loss under the 2-child policy.",
      url: "https://timesofindia.indiatimes.com/city/bhopal/mp-teacher-wife-bury-newborn-alive-over-two-child-policy-fear-baby-survives-couple-booked/articleshow/124267999.cms",
      image:
        "https://static.toiimg.com/thumb/msid-124272091,width-1070,height-580,imgsize-138266,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2025-10-02T01:50:00Z",
      source: { name: "Times of India" }
    },
    {
      id: "389342a6533407004fdb04b56841cd0f",
      title:
        "‘Sunny Sankari Ki Tulsi Kumari’ FIRST reviews: Netizens hail movie as a ‘highly entertaining romcom’",
      description:
        "Released alongside 'Kantara: Chapter 1', the film is receiving positive reviews.",
      url: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/sunny-sankari-ki-tulsi-kumari-first-reviews-netizens-hail-this-janhvi-kapoor-varun-dhawan-rohit-saraf-sanya-malhotra-movie-as-a-highly-entertaining-romcom/articleshow/124267812.cms",
      image:
        "https://static.toiimg.com/thumb/msid-124267809,width-1070,height-580,imgsize-135580,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2025-10-02T01:08:00Z",
      source: { name: "Times of India" }
    }
  ]
};





  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
  }, [props.category]);

  const fetchMoreData = async () => {
    let nextPage = page + 1;
    setPage(nextPage);
    const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=in&max=10&apikey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles((prevArticles) =>
      prevArticles.concat(parsedData.articles || [])
    );
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <h1
            className="text-center"
            style={{ margin: "35px 0px", marginTop: "90px" }}
          >
            NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
          </h1>
          {loading && <Spinner />}
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    image={element.image}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
