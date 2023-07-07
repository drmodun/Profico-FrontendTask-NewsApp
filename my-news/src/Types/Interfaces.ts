

export interface ResponseNYT{
    copyright: string;
    response: {
        docs: Article[];
        meta: object;
    }
};

export interface Headline{
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
}

export interface Keyword{
    name: string;
    value: string;
    rank: number;
    major: string;
}

export interface Mutimedia{
    rank: number;
    subtype: string;
    caption: string;
    credit: string;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy: object;
    subType: string;
    crop_name: string;    
}

export interface Byline{
    original: string;
    person: object[];
    organization: string;
}

export interface Article{
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    document_type: string;
    source: string;
    multimedia: Mutimedia[];
    headline: Headline;
    keywords: Keyword[];
    pub_date: string;
    document_number: string;
    byline: Byline;
    news_desk: string;
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
}

export interface ArticleView{
    web_url: string;
    headline: string;
    thumbnailURL: string;
    abstract: string;
    pub_date: Date;
    author: string;
    category: string;
    id: string;
}

export const ArticleToArticleView = (article: Article): ArticleView => {
    console.log(article.multimedia);
    const thumbail = article.multimedia.filter((media: Mutimedia) => {console.log(media.subtype);return media.subtype === 'jumbo'});
    const thumbnailURL: string = thumbail.length ? "https://static01.nyt.com/" + thumbail[0].url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    const articleView: ArticleView = {
        web_url: article.web_url,
        headline: article.headline.main,
        thumbnailURL: thumbnailURL,
        abstract: article.abstract,
        pub_date: new Date(article.pub_date),
        author: article.byline.original,
        category: article.news_desk,
        id: article._id
        //news_desk is the closest thing to a category that I can find
    }
    return articleView;
}