import { Key } from "react";
import { ResponseNYT } from "../Types/Interfaces";
const apiKey: string = "FzaChjqH7kAkAgpDjnHGYNgLqovroxtA";
const currentDate: Date = new Date();
const currentMonth: number = currentDate.getMonth() + 1;
const currentYear: number = currentDate.getFullYear();

const proxyUrl: string = "https://corsproxy.io/?";
//gonna use proxy to bypass cors, but later might just use insecure chrome startup
//somtimes the proxy doesn't work, so I'll have to use the insecure chrome startup in the future

export async function getNYTArchiveData(
  month: number = currentMonth,
  year: number = currentYear
): Promise<ResponseNYT | null> {
  try {
    const apiUrl: string = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;
    console.log(proxyUrl + apiUrl);
   const response = await fetch(proxyUrl + apiUrl);
   const data: object = response.json();
   console.log(data);
  console.log(data);
    return data as ResponseNYT;
  } catch (error) {
    console.error(error);
    return null;
  }
}
