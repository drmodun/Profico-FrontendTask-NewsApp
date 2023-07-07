import { ArticleView } from "./Interfaces";

export function GetFavourites(): ArticleView[] {
  const favourites = localStorage.getItem("favourites");
  if (favourites) {
    return JSON.parse(favourites);
  }
  localStorage.setItem("favourites", JSON.stringify([]));
  return [];
}

export const favourites: ArticleView[] | [] = GetFavourites();