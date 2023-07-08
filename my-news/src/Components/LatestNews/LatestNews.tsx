import { News } from "../../Types/Interfaces";
import { useState } from "react";
import LatestNewsSvg from "../../Assets/svg/LatestNews.svg";
import ArrowIcon from "../../Assets/svg/ArrowIcon.svg";
import NewsView from "../News";


interface LatestNewsProps {
    NewsList: News[];
}
export const LatestNews = ({NewsList} : LatestNewsProps) => {
    const [selectedNews, setSelectedNews] = useState<News[]>([]);
    return (
        <div className="latest-news">
            <div className="title-section">
                <img src={LatestNewsSvg} alt="" />
                <span>Latest News</span>
            </div>
            <div className="news-container">
                {NewsList
                .map((news) => (
                    <NewsView {...news} />
                ))}
            </div>
            <a className="all-news" href="https://www.nytimes.com/">
                <span >See all news</span>
                <img src={ArrowIcon} alt="" />
            </a>
        </div>
    )


        

}