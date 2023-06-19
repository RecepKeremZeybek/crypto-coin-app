// api key coinranking5787f1b20234b3e445601abdfdba9358393fbf304707a9ff

const form = document.querySelector(".top-banner form");

const input = document.querySelector(".top-banner input");

const msgSpan = document.querySelector(".container .msg");

const coinList = document.querySelector(".ajax-section .container .coins");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCoinDataFromApi();
});

const getCoinDataFromApi = () => {
  alert("Get Coin Data!");
};
