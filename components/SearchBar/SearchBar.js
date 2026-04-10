export default function SearchBar() {
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.dataset.js = "search-bar";
  searchBar.action = "";
  searchBar.innerHTML = `
        <input
        name="query"
        class="search-bar__input"
        type="text"
        placeholder="search characters"
        aria-label="character name"
        data-js="query-input"
        />
        <button class="search-bar__button" aria-label="search for character">
        <img class="search-bar__icon" src="assets/magnifying-glass.png" alt="" />
        </button>
    `;

  return searchBar;
}
