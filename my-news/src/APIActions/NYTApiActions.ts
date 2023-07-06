const apiKey = "FzaChjqH7kAkAgpDjnHGYNgLqovroxtA";
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const apiUrl = `https://api.nytimes.com/svc/archive/v1/${currentYear}/${currentMonth}.json?api-key=${apiKey}`;
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//gonna use proxy to bypass cors, but later might just use insecure chrome startup

async function getNYTArchiveData() {
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getNYTArchiveData();