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
import MenuOn from "./Assets/svg/MenuOn.svg";
import MenuOff from "./Assets/svg/MenuOff.svg";

const EmptyArticle: ArticleView[] = [];
const EmptyNews: News[] = [];
const App: React.FC = () => {
  const [articles, setArticles] = React.useState(EmptyArticle);
  const [news, setNews] = React.useState(EmptyNews);
  const [currentMonth, setCurrentMonth] = React.useState(0);
  const [search, setSearch]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("");

  const [menu, setMenu]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = React.useState(false);

  const [errorMessages, setErrorMessages]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("");

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("Home");

  const [selected, setSelected]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("All");

  const [favouriteArticles, setFavouriteArticles] = React.useState(favourites);


  function getMoreNews (): void {
    const getMonth = new Date().getMonth();
    const fetchData = async (): Promise<void> => {
      console.log(getMonth-currentMonth);
      const data: ResponseNYT | null = await getNYTArchiveData(getMonth-currentMonth);
      setCurrentMonth(prev=>prev+1);
      if (data === null) {
        return;
      }
      const articles: ArticleView[] = data.response.docs.map(
        (article: Article) => ArticleToArticleView(article)
      );
      const news: News[] = data.response.docs.map((article: Article) =>
        ArticleToNews(article)
      );
      setArticles((prev)=>[...prev,...articles]);
      setNews((prev)=>[...prev,...news]);
    };
    fetchData();
  }


  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (currentMonth > 12) {
        //I think it would be too much to load articles before 2023
        return;
      }
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
          <span className="nav-sub">
            Every day discover what's trending on the internet
          </span>
          <button className="nav-cancel">No thanks</button>
          <button className="nav-button">GET</button>
        </div>
      </nav>
      <div className="container">
        <div className="header">
          <div className="header-top">
            <div className={menu ? "active-container" : "inactive-container"}>
              <img
                src={MyNews}
                className={menu ? "active-logo" : "logo"}
                alt="MyNews"
              />
            </div>
            <button
              className="menu"
              onClick={() => {
                setSelected(!menu ? "Menu" : "Featured");
                setMenu((prev) => !prev);
              }}
            >
              <img src={menu ? MenuOn : MenuOff} alt="Menu" />
            </button>
          </div>
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
        <div className="divider"></div>
        <div className="body">
          { selected === "Featured" || selected === "Latest" ? (
            <div className="selector">
            <button
              onClick={() => setSelected("Featured")}
              className={selected === "Featured" ? "active-option" : "option"}
            >
              Featured
            </button>
            <button
              onClick={() => setSelected("Latest")}
              className={selected === "Latest" ? "active-option" : "option"}
            >
              Latest
            </button>
          </div>) : null}
          {selected === "Menu" || selected === "All" ? (
            <div className="category-selector">
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
          ) : null}
          <div className="article-list-container">
            <span>News</span>
            {selected === "Featured" || selected === "All" ? (
              <div className="article-list">
                {articles
                  .filter((article) => {
                    if (category === "Favourites") {
                      return isFavourite(article.id);
                    }
                    if (category === "Today") {
                      return article.pub_date.getDay() === new Date().getDay();
                    }
                    return (
                      (article.category === category || category === "Home") &&
                      (article.headline
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        search === "")
                    );
                  })
                  .splice(0, articles.length > 40 ? 40 : articles.length)
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
                {selected === "All" && <LatestNews NewsList={news
                .filter((article) => {
                  if (category === "Today") {
                    return article.date.getDay() === new Date().getDay();
                  }
                  return (
                    (article.category === category || category === "Home" || category === "Favourites" || category === "Today")
                  );
                })
                } getMoreNews={getMoreNews} 
                category={category}
                />}
              </div>
            ) : selected === "Latest" ? (
              <LatestNews NewsList={news
                .filter((article) => {
                  if (category === "Today") {
                    return article.date.getDay() === new Date().getDay();
                  }
                  return (
                    (article.category === category || category === "Home" || category === "Favourites" || category === "Today")
                  );
                })
                }
                getMoreNews={getMoreNews}
                category={category}
              />
            ) : null}
          </div>
        </div>
        {errorMessages !== "" && (
          <div className="error">
            {errorMessages +
              "if this is your first time opening the app, you might need to get temporary authorization from the proxy server, just visit the page "}
            <a href="https://cors-anywhere.herokuapp.com/corsdemo">
              https://cors-anywhere.herokuapp.com/corsdemo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
