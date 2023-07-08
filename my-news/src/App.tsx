import React from "react";
import ArticleComponent from "./Components/Article";
import { getNYTArchiveData } from "./APIActions/NYTApiActions";
import {
  Article,
  ArticleToArticleView,
  ArticleToNews,
  ArticleView,
  CategoryInfo,
  News,
  ResponseNYT,
} from "./Types/Interfaces";
import { GetFavourites, favourites } from "./Types/LocalFunctions";
import { Categories } from "./Types/CategoryAssetList";
import Category from "./Components/Category";
import LatestNews from "./Components/LatestNews";
import MyNews from "./Assets/svg/MyNews.svg";
import Search from "./Assets/svg/Search.svg";

const EmptyArticle: ArticleView[] = [];
const EmptyNews: News[] = [];
const App: React.FC = () => {
  const [articles, setArticles] = React.useState(EmptyArticle);
  const [news, setNews] = React.useState(EmptyNews);
  const [search, setSearch]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("");

  const [errorMessages, setErrorMessages]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("");

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("Home");

  const [favouriteArticles, setFavouriteArticles] = React.useState(favourites);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data: ResponseNYT | null = await getNYTArchiveData();
      console.log(data);
      if (data === null) {
        setErrorMessages("There was an error fetching the data");
        return;
      }
      const articles: ArticleView[] = data.response.docs.map(
        (article: Article) => ArticleToArticleView(article)
      );
      const news: News[] = data.response.docs.map((article: Article) =>
        ArticleToNews(article)
      );
      setArticles(articles);
      setNews(
        news.sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        })
      );
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouriteArticles));
  }, [favouriteArticles]);

  function toggleBookmark(isBookmarked: boolean, article: ArticleView): void {
    isBookmarked
      ? setFavouriteArticles((prev) => [...prev, article])
      : setFavouriteArticles((prev) =>
          prev.filter((articleToRemove) => {
            return article.id !== articleToRemove.id;
          })
        );
  }

  function isFavourite(id: string): boolean {
    return (
      favouriteArticles.filter((article) => {
        return id == article.id;
      }).length > 0
    );
  }

  return (
    <div className="App">
      <nav>
        <div className="nav-container">
            <span className="nav-main">Make MyNews your homepage</span>
            <span className="nav-sub">Every day discover what's trending on the internet</span>
            <button className="nav-cancel">No thanks</button>
            <button className="nav-button">GET</button>
        </div>

      </nav>
      <div className="container">
        <div className="header">
          <img src={MyNews} alt="MyNews" />
          <div className="search">
            <img src={Search} alt="Search news" />
            <input
              type="text"
              placeholder="Search news"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button>
              <p>Search</p>
            </button>
          </div>
        </div>
        <div className="divider">
          
        </div>
        <div className="body">
          <div className="category-selector">
            <span className="title">Categories</span>
            <div className="categories">
              {Categories.map((categoryToMap: CategoryInfo) => (
                <Category
                  Name={categoryToMap.Name}
                  ImageOn={categoryToMap.ImageOn}
                  ImageOff={categoryToMap.ImageOff}
                  setCategory={setCategory}
                  isActive={categoryToMap.Name === category}
                />
              ))}
            </div>
          </div>
          <div className="content">
            {articles
              .filter((article) => {
                if (category === "Favourites") {
                  return isFavourite(article.id);
                }
                return (
                  (article.category === category || category === "Home") &&
                  (article.headline
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    search === "")
                );
              })
              .sort((a, b) => {
                return a.pub_date > b.pub_date ? -1 : 1;
              })
              .map((article: ArticleView) => (
                <ArticleComponent
                  Article={article}
                  toggleBookmark={toggleBookmark}
                  isFavourite={isFavourite(article.id)}
                />
              ))}
          </div>
          <LatestNews NewsList={news} />
          {errorMessages !== "" && (
            <div className="error">
              {errorMessages +
                "if this is your first time opening the app, you might need to get temporary authorization from the proxy server, just visit the page https://cors-anywhere.herokuapp.com/corsdemo"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
