export default function NavPagination() {
  const navigation = document.createElement("span");
  navigation.classList.add("navigation__pagination");
  navigation.dataset.js = "pagination";
  navigation.textContent = "1 / 1";

  return navigation;
}
