// Elements
const refreshBtn = document.querySelector(".refresh-btn");
const quote = document.getElementById("quotation");
const creator = document.getElementById("author");

// Functions
const fetchApi = async () => {
  const response = await fetch("https://type.fit/api/quotes");
  const jsonResult = await response.json();
  return jsonResult;
};

const displayData = async (obj) => {
  let random = Math.floor(Math.random() * 1643);
  let quoteObj = obj[random];
  quote.innerHTML = `&#8220;${quoteObj.text}&#8221;`;
  creator.innerHTML = `&#126 ${quoteObj.author}`;
};

const run = async () => {
  let data = await fetchApi();
  displayData(data);
};

document.addEventListener("onload", run());
// Event-handlers
