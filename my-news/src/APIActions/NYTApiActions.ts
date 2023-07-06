import { Key } from "react";

const apiKey: string = "FzaChjqH7kAkAgpDjnHGYNgLqovroxtA";
const currentDate: Date = new Date();
const currentMonth: number = currentDate.getMonth() + 1;
const currentYear: number = currentDate.getFullYear();

const proxyUrl: string  = "https://cors-anywhere.herokuapp.com/";
//gonna use proxy to bypass cors, but later might just use insecure chrome startup


interface ResponseObject{
    status: string;
    contents: string;
}

interface ResponseNYT{
    copyright: string;
    response: {
        docs: Article[];
        meta: object;
    }
};

interface Headline{
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
}

interface Keyword{
    name: string;
    value: string;
    rank: number;
    major: string;
}

interface Mutimedia{
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

interface Article{
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
    byline: object;
    news_desk: string;
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
}

async function getNYTArchiveData(month: number = currentMonth, year: number = currentYear): Promise<ResponseNYT> {
    try {
      const apiUrl: string = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;
    const response: Response = await fetch(proxyUrl + apiUrl);
    const data: object = await response.json();
    const dataAsObject: ResponseObject = data as ResponseObject;
    const NYTData: ResponseNYT = JSON.parse(dataAsObject.contents) as ResponseNYT;
    console.log(data);
    return NYTData;
  } catch (error) {
    console.error(error);
    return error;
  }
}

getNYTArchiveData();