import { Key } from "react";
import { ResponseNYT } from "../Types/Interfaces";
const apiKey: string = "FzaChjqH7kAkAgpDjnHGYNgLqovroxtA";
const currentDate: Date = new Date();
const currentMonth: number = currentDate.getMonth() + 1;
const currentYear: number = currentDate.getFullYear();

const proxyUrl: string = "https://corsproxy.io/?";
//the used cors proxy, cors-anywhere.herokuapp.com is an alternative if this doesnt work
//, but you need to visit the website and get demo access to use it

export async function getNYTArchiveData(
  month: number = currentMonth,
  year: number = currentYear
): Promise<ResponseNYT | null> {
  try {
    const apiUrl: string = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;
    console.log(proxyUrl + apiUrl);
   const response = await fetch(proxyUrl + apiUrl);
   const data: object = response.json();
    return data as ResponseNYT;
  } catch (error) {
    console.error(error);
    return null;
  }
}
