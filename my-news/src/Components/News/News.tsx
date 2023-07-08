import React from "react";
import { News } from "../../Types/Interfaces";

//Not sure if it is possible to bookmark news, but either way it would mess up the designs

export const NewsView = (News: News) => {
  return (
    <div className="news">
      <div className="date">{News.date.getTime()}</div>
      <a className="title" href={News.url}>
        {News.title}
      </a>
      <div className="divider"></div>
    </div>
  );
};
