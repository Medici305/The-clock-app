// Elements
const refreshBtn = document.querySelector(".refresh-btn");
const moreBtn = document.getElementById("more-button");
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

// Get day of the week.
const getDayOfWeek = () => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const d = new Date();
  const n = days[d.getDay()];
  return n;
};

// Get of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

// Get week number of the year
const getWeekNr = () => {
  const currentdate = new Date();
  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (currentdate - oneJan) / (24 * 60 * 60 * 1000)
  );
  const result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return result;
};

// Set all the number into card under background.
const setDateData = () => {
  document.getElementById("day-of-week").innerHTML = getDayOfWeek();
  document.getElementById("day-of-year").innerHTML = getDayOfYear();
  document.getElementById("week-nr").innerHTML = getWeekNr();
};

// Set the specific period of the day. Change background and sun/moon logo.
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
    console.log("Geolocation is not supported by this browser.");
  }
};

// Set the location of user (country, city) via using user lat and long details.
const showPosition = async (position) => {
  const timeZone = document.getElementById("time-zone");
  const country = document.getElementById("country");
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let locationObj = await getCity(lat, long);
  let countryCode = locationObj.address.country;
  let city = locationObj.address.city;
  timeZone.innerHTML = locationObj.address.city;
  country.innerHTML = `${countryCode}, ${
    city || locationObj.address.country_code
  }`;
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

// GSAP slide up animation
const animationSlide = () => {
  const bg = document.querySelector(".background");
  if (!bg.classList.contains("slide")) {
    moreBtn.innerHTML = "Less";
    bg.classList.add("slide");
    gsap.to(bg, 3, {
      y: "-60%",
      ease: "elastic",
    });
  } else {
    moreBtn.innerHTML = "More";
    bg.classList.remove("slide");
    gsap.to(bg, 1, {
      y: "0%",
      ease: "power2.out",
    });
  }
};

// Event-handlers
document.addEventListener(
  "onload",
  run(),
  setTime(),
  getCoordinates(),
  setDateData()
);

refreshBtn.addEventListener("click", () => {
  run();
});

moreBtn.addEventListener("click", animationSlide);
