import './index.scss';
import React from 'react';
import ArticleComponent from './Components/Article';
import { getNYTArchiveData } from './APIActions/NYTApiActions';
import { Article, ArticleToArticleView, ResponseNYT } from './Types/Interfaces';
const EmptyArticle: Article[] = []
const App: React.FC = () => {
  const [articles, setArticles] = React.useState(EmptyArticle)
  const [errorMessages, setErrorMessages] : [string, React.Dispatch<React.SetStateAction<string>>] = React.useState("")
  React.useEffect(() => {
    const fetchData = async () : Promise<void> => {
      const data: ResponseNYT | null = await getNYTArchiveData()
      console.log(data);
      if (data === null){
        setErrorMessages("There was an error fetching the data")
        return
      }
      setArticles(data.response.docs)
    };
    fetchData()
  }, [])
  return (
    <div className="App">
      <div className="header">
        <span className="title">My News</span>
      </div>
      <div className="content">
        {articles.map((article: Article) => (
          <ArticleComponent {...ArticleToArticleView(article)} />
        ))}
      </div>
      {errorMessages !== "" && <div className="error">{errorMessages}</div>}
    </div>
  );
}

export default App;
