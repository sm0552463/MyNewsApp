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
        let nextPage=1;
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        console.log("Fetching URL:", url);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    }, [props.category]);

    const fetchMoreData = async () => {
        let nextPage = page + 1;
        setPage(nextPage);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
        setTotalResults(parsedData.totalResults || 0);
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
                NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
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
