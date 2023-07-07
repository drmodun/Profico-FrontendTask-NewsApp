import React from 'react'
import { ArticleView } from '../../Types/Interfaces'
import BookmarkOn from '../../Assets/Bookmark-On.png'
import BookmarkOff from '../../Assets/Bookmark-Off.png'

//svg is better but png will do for now

export const ArticleComponent = (Article: ArticleView) => {
    const [bookmark, setBookmark] = React.useState(
        localStorage.getItem(Article.id) === null
    )

    function toggleBookmark() : void {
        if (bookmark) {
            localStorage.setItem(Article.id, JSON.stringify(Article))
        } else {
            localStorage.removeItem(Article.id)
        }
        setBookmark(!bookmark)
    }

    return (
        <div className="article">
            <img src={Article.thumbnailURL} alt={Article.headline} className='image' />
            <div className="content">
                <span className='category'>{Article.category}</span>
                <div className='title-section'>
                    <a href={Article.web_url} className='title'>{Article.headline}</a>
                    <a className='bookmark' onClick={toggleBookmark}>
                       <img src={bookmark ? BookmarkOn : BookmarkOff} alt="bookmark" className='icon' /> 
                    </a>
                </div>
                <span className='author'>{Article.author}</span>
            </div>
        </div>
    )    
}