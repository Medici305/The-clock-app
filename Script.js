// Elements
const refreshBtn = document.querySelector(".refresh-btn");
const quote = document.getElementById("quotation");
const creator = document.getElementById("author");

// Functions
const setTime = () => {
  const currentTime = document.querySelector(".set-time");
  const dayNight = document.getElementById("am-pm");
  let today = new Date();
  let minute;
  let hours = today.getHours();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  today.getMinutes() < 10
    ? (minute = `0${today.getMinutes()}`)
    : (minute = today.getMinutes());
  let time = hours + ":" + minute;
  currentTime.innerHTML = time;
  dayNight.innerHTML = ampm;
  arbitron(hours, ampm);
};

const arbitron = (hour, ampm) => {
  const arb = document.querySelector(".time-of-day");
  const sun = document.getElementById("sun");
  let timeOfDay;
  if (ampm === "am") {
    if ((hour >= 1 && hour < 6) || hour === 12) {
      (timeOfDay = "Night"),
        (sun.src = "./images/desktop/icon-moon.svg"),
        (document.querySelector(".background").style.backgroundImage =
          "url(../images/night.png)");
    } else if (hour >= 6 && hour <= 12) {
      (timeOfDay = "Morning"),
        (sun.src = "./images/desktop/icon-sun.svg"),
        (document.querySelector(".background").style.backgroundImage =
          "url(../images/day.png)");
    }
  }
  if (ampm === "pm") {
    if ((hour >= 1 && hour < 6) || hour === 12) {
      (timeOfDay = "Afternoon"),
        (sun.src = "./images/desktop/icon-sun.svg"),
        (document.querySelector(".background").style.backgroundImage =
          "url(../images/day.png)");
    } else if (hour >= 6 && hour < 12) {
      (timeOfDay = "Evening"),
        (sun.src = "./images/desktop/icon-moon.svg"),
        (document.querySelector(".background").style.backgroundImage =
          "url(../images/night.png)");
    }
  }
  arb.innerHTML = `Good ${timeOfDay}, It's currently`;
};

const getCoordinates = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

const showPosition = async (position) => {
  const country = document.getElementById("country");
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let locationObj = await getCity(lat, long);
  console.log(locationObj.address);
  let countryCode = locationObj.address.country;
  let city = locationObj.address.city;
  country.innerHTML = `${countryCode}, ${city}`;
};

const getCity = async (latitude, longitude) => {
  const data = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=pk.64ee77ec3ab352052df68c111ee6aefa&lat=${latitude}&lon=${longitude}&format=json`
  );
  const response = await data.json();
  return response;
};

const fetchApi = async () => {
  const response = await fetch("https://type.fit/api/quotes");
  const jsonResult = await response.json();
  return jsonResult;
};

const displayData = async (obj) => {
  let random = Math.floor(Math.random() * 1643);
  let quoteObj = obj[random];
  quote.innerHTML = `&#8220;${quoteObj.text}&#8221;`;
  quoteObj.author
    ? (creator.innerHTML = `&#126 ${quoteObj.author}`)
    : "Author not available";
};

const run = async () => {
  let data = await fetchApi();
  displayData(data);
};

// Function Calls
getCoordinates();

// Event-handlers
document.addEventListener("onload", run(), setTime());
refreshBtn.addEventListener("click", () => {
  run();
});
