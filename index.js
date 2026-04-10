console.clear();

import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const pagination = document.querySelector('[data-js="pagination"]');

const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

function createNavigation() {
  navigation.append(NavButton()[0], NavPagination(), NavButton()[1]);
}

function createSearchBar() {
  searchBarContainer.append(SearchBar());
}

function createEventListeners() {
  prevButton.addEventListener("click", (event) => {
    if (page > 1) {
      page--;
      fetchCharacters();
    }
  });

  nextButton.addEventListener("click", (event) => {
    if (page < maxPage) {
      page++;
      fetchCharacters();
    }
  });

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    searchQuery = encodeURI(queryInput.value);
    page = 1;
    fetchCharacters();
  });
}

createSearchBar();
createNavigation();

const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const queryInput = document.querySelector('[data-js="query-input"]');

createEventListeners();

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
      document.querySelector('[data-js="pagination"]').textContent = `${page} / ${maxPage}`;

      data.results?.forEach((result) => {
        cardContainer.append(CharacterCard(result));
      });
    } else {
      //throw new Error("Could not find a character matching the search string");
      console.log("response not ok");
      page = 1;
      maxPage = 1;
      document.querySelector('[data-js="pagination"]').textContent = ``;

      cardContainer.innerHTML = `<li class="card card--error">Could not find a character matching the search string</li>`;
    }
    handleDisabledButtons(page, maxPage);
  } catch (error) {
    console.log(error);

    cardContainer.innerHTML = `<li class="card card--error">Network error: Too many requests. <br>Trying again automatically in 5 seconds</li>`;
    setTimeout(function () {
      fetchCharacters();
    }, 5000);

    /*
    console.log("test", error);
    console.log("test", error.message);
    console.log("catch error");
    page = 1;
    maxPage = 1;
    cardContainer.innerHTML = `<li class="card card--error">${error.message}</li>`;
    handleDisabledButtons(page, maxPage);

    */
  }
  window.scrollTo({ top: 0 });
}

fetchCharacters();
