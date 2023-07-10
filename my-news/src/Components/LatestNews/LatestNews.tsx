import { News } from "../../Types/Interfaces";
import { useEffect, useState, useRef } from "react";
import LatestNewsSvg from "../../Assets/svg/LatestNews.svg";
import ArrowIcon from "../../Assets/svg/ArrowIcon.svg";
import NewsView from "../News";

interface LatestNewsProps {
  NewsList: News[];
  category: string;
}
export const LatestNews = ({ NewsList, category }: LatestNewsProps) => {
  const [selectedNews, setSelectedNews] = useState<News[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(NewsList.length ? NewsList.length / 20 : 2);
  const [loading, setLoading] = useState<boolean>(false);
  

  //currently the initial load is 2000 articles if not more, so I consider it sufficient enough, but later I might make another call
  //due to not wanting to make too many calls to the API I will just call it five times at the start


  useEffect(() => {
    setPage(1);
    setSelectedNews([]);
    setMaxPage(Math.floor(NewsList.length / 20));
    setLoading(false);
  }, [category]);

  const pageSize = 20; 

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNews();
    setMaxPage(Math.floor(NewsList.length / 20));
    setLoading(false);
  }, [NewsList]);


  useEffect(() => {
    loadNews();
  }, [page]);

  useEffect(() => {
    if (page > maxPage && !loading)
      setLoading(true);
  }, [page]);


  const loadNews = () => {
    console.log("loading news");
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const news = NewsList.slice(startIndex, endIndex);
    console.log(news, page);
    setSelectedNews(prev=>[...prev, ...news]);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const object = document.getElementById("container")
    if (!object) return;
    object.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="latest-news">
      <div className="title-section">
        <img src={LatestNewsSvg} alt="" />
        <span>Latest News</span>
      </div>
      <div id="container" ref={containerRef} className="news-container">
        {selectedNews.map((news) => (
          <NewsView {...news} />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <a className="all-news" href="https://www.nytimes.com/">
        <span>See all news</span>
        <img src={ArrowIcon} alt="" />
      </a>
    </div>
  );
};
