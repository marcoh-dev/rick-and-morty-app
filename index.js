console.clear();

import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const queryInput = document.querySelector('[data-js="query-input"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`,
  );
  const data = await response.json();
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;
  cardContainer.innerHTML = "";
  data.results.forEach((result) => {
    cardContainer.append(createCharacterCard(result));
  });
}

fetchCharacters();

nextButton.addEventListener("click", (event) => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", (event) => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  console.log(queryInput.value);
  searchQuery = encodeURI(queryInput.value);
  fetchCharacters();
});
