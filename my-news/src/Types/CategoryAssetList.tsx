import { CategoryInfo } from "./Interfaces";
import HomeOn from "../Assets/svg/HomeOn.svg";
import HomeOff from "../Assets/svg/HomeOff.svg";
import BusinessOn from "../Assets/svg/BusinessOn.svg";
import BusinessOff from "../Assets/svg/BusinessOff.svg";
import SportsOn from "../Assets/svg/SportsOn.svg";
import SportsOff from "../Assets/svg/SportsOff.svg";
import ForeignOn from "../Assets/svg/ForeignOn.svg";
import ForeignOff from "../Assets/svg/ForeignOff.svg";
import ScienceOn from "../Assets/svg/ScienceOn.svg";
import ScienceOff from "../Assets/svg/ScienceOff.svg";
import TechnologyOn from "../Assets/svg/TechnologyOn.svg";
import TechnologyOff from "../Assets/svg/TechnologyOff.svg";
import HealthOn from "../Assets/svg/HealthOn.svg";
import HealthOff from "../Assets/svg/HealthOff.svg";
import BookmarkOn from "../Assets/svg/BookmarkOn.svg";
import BookmarkOff from "../Assets/svg/BookmarkOff.svg";
import BookGuideOn from "../Assets/svg/BookGuideOn.svg";
import BookGuideOff from "../Assets/svg/BookGuideOff.svg";
import GameOn from "../Assets/svg/GamesOn.svg";
import GameOff from "../Assets/svg/GamesOff.svg";
import WeatherOn from "../Assets/svg/WeatherOn.svg";
import WeatherOff from "../Assets/svg/WeatherOff.svg";
import TodayOn from "../Assets/svg/TodayOn.svg";
import TodayOff from "../Assets/svg/TodayOff.svg";
//later add when I have more icons

export const Categories: CategoryInfo[] = [
    {
        Name: "Home",
        ImageOn: HomeOn,
        ImageOff: HomeOff
    },
    {
        Name: "Favourites",
        ImageOn: BookmarkOn,
        ImageOff: BookmarkOff
    },
    {
        Name: "Today",
        ImageOn: TodayOn,
        ImageOff: TodayOff
    },
    {
        Name: "Business",
        ImageOn: BusinessOn,
        ImageOff: BusinessOff
    },
    {
        Name: "Sports",
        ImageOn: SportsOn,
        ImageOff: SportsOff
    },
    {
        Name: "Foreign",
        ImageOn: ForeignOn,
        ImageOff: ForeignOff
    },
    {
        Name: "Science",
        ImageOn: ScienceOn,
        ImageOff: ScienceOff
    },
    {
        Name: "NYTNow",
        ImageOn: TechnologyOn,
        ImageOff: TechnologyOff
    },
    {
        Name: "Dining",
        ImageOn: HealthOn,
        ImageOff: HealthOff
    },
    {
        Name: "Books",
        ImageOn: BookGuideOn,
        ImageOff: BookGuideOff
    },
    {
        Name: "Games",
        ImageOn: GameOn,
        ImageOff: GameOff
    },
    {
        Name: "Climate",
        ImageOn: WeatherOn,
        ImageOff: WeatherOff
    },


];
