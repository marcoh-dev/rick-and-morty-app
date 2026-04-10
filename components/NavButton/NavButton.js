export default function NavButton() {
  const prevButton = document.createElement("button");
  prevButton.classList.add("button", "button--prev");
  prevButton.dataset.js = "button-prev";
  prevButton.textContent = "previous";

  const nextButton = document.createElement("button");
  nextButton.classList.add("button", "button--next");
  nextButton.dataset.js = "button-next";
  nextButton.textContent = "next";

  return [prevButton, nextButton];
}
