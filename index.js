import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const searchInput = document.querySelector('[data-js="search-bar__input"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      maxPage = data.info.pages;
      pagination.textContent = `${page} / ${maxPage}`;
      cardContainer.innerHTML = "";
      data.results.forEach((character) => {
        createCharacterCard(character);
      });
      return data;
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error occurred");
  }
}

const data = await fetchCharacters();
data.results.forEach((character) => {
  createCharacterCard(character);
});
console.log(data.results);

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.querySelector(".search-bar__input").value;
  fetchCharacters();
  page = 1;
  searchInput.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
