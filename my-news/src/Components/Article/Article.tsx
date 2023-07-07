import React, { EventHandler, useEffect } from 'react'
import { ArticleView, Props } from '../../Types/Interfaces'
import BookmarkOn from '../../Assets/Bookmark-On.png'
import BookmarkOff from '../../Assets/Bookmark-Off.png'
//svg is better but png will do for now

export const ArticleComponent = ({Article, toggleBookmark, isFavourite} : Props) => {
    const [bookmark, setBookmark] : [boolean,React.Dispatch<React.SetStateAction<boolean>>]
     = React.useState(isFavourite);

    function toggleBookmarkLocal() : void {
        if (bookmark) {
            toggleBookmark(false,Article);
        } 
        else {
            toggleBookmark(true, Article);
        }
    }

    useEffect(() => {
        setBookmark(isFavourite);
    }, [isFavourite])

    return (
        <div className="article">
            <img src={Article.thumbnailURL} alt={Article.headline} className='image' />
            <div className="content">
                <span className='category'>{Article.category}</span>
                <div className='title-section'>
                    <a href={Article.web_url} className='title'>{Article.headline}</a>
                    <a className='bookmark' onClick={toggleBookmarkLocal}>
                       <img src={bookmark ? BookmarkOn : BookmarkOff} alt="bookmark" className='icon' /> 
                    </a>
                </div>
                <span className='author'>{Article.author}</span>
            </div>
        </div>
    )    
}