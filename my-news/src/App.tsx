import "./index.scss";
import React from "react";
import ArticleComponent from "./Components/Article";
import { getNYTArchiveData } from "./APIActions/NYTApiActions";
import {
  Article,
  ArticleToArticleView,
  ArticleView,
  CategoryInfo,
  ResponseNYT,
} from "./Types/Interfaces";
import { GetFavourites, favourites } from "./Types/LocalFunctions";
import { Categories } from "./Types/CategoryAssetList";
import Category from "./Components/Category";

const EmptyArticle: ArticleView[] = [];
const App: React.FC = () => {
  const [articles, setArticles] = React.useState(EmptyArticle);
  const [errorMessages, setErrorMessages]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("");

  const [category, setCategory]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = React.useState("World");

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
      setArticles(articles);
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
      <div className="header">
        <span className="title">My News</span>
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
          {articles.map((article: ArticleView) => (
            <ArticleComponent
              Article={article}
              toggleBookmark={toggleBookmark}
              isFavourite={isFavourite}
            />
          ))}
        </div>
        {errorMessages !== "" && <div className="error">{errorMessages}</div>}
        <div className="favourites">
          <span className="title">Favourites</span>
          {favouriteArticles.map((article: ArticleView) => (
            <ArticleComponent
              Article={article}
              toggleBookmark={toggleBookmark}
              isFavourite={isFavourite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
