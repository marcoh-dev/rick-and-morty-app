console.clear();

import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
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

function handleDisabledButtons() {
  if (page <= 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  if (page >= maxPage) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`);
    const data = await response.json();
    if (response.ok) {
      console.log(response.ok);
      maxPage = data.info ? data.info.pages : 0;
      pagination.textContent = `${page} / ${maxPage}`;

      data.results?.forEach((result) => {
        cardContainer.append(createCharacterCard(result));
      });
    } else {
      page = 1;
      maxPage = 1;
      pagination.textContent = ``;
    }
    handleDisabledButtons();
  } catch (error) {
    page = 1;
    maxPage = 1;
    cardContainer.innerHTML = `<li class="card card--error">${error.message}</li>`;
    handleDisabledButtons();
  }
  window.scrollTo({ top: 0 });
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
  searchQuery = encodeURI(queryInput.value);
  page = 1;
  fetchCharacters();
});
