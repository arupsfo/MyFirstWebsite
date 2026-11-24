const themeButton = document.querySelector(".theme-toggle");
const page = document.documentElement;
const themeKey = "my-first-portfolio-theme";

// Some browsers restrict storage when a page is opened directly from disk.
let savedTheme;
try {
  savedTheme = localStorage.getItem(themeKey);
} catch {
  // The button still works for the current visit.
}

function applyTheme(theme) {
  page.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeButton.addEventListener("click", () => {
  const nextTheme = page.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);

  try {
    localStorage.setItem(themeKey, nextTheme);
  } catch {
    // Theme switching does not depend on saving the preference.
  }
});

// Only show the button after JavaScript makes it interactive.
themeButton.hidden = false;

const greetingForm = document.querySelector("#greeting-form");
const visitorName = document.querySelector("#visitor-name");
const greetingMessage = document.querySelector("#greeting-message");

// A form handles both the Say Hello button and Enter in the name field.
function showGreeting(event) {
  event.preventDefault();
  const name = visitorName.value.trim();

  if (name === "") {
    greetingMessage.textContent = "Please enter your name so I can say hello.";
    visitorName.focus();
    return;
  }

  // textContent displays the name as plain text, even if it looks like HTML.
  greetingMessage.textContent = `Hello, ${name}! Thanks for visiting my portfolio.`;
}

greetingForm.addEventListener("submit", showGreeting);
document.querySelector("#greeting").hidden = false;

const projectFilters = document.querySelector("#project-filters");
const filterButtons = projectFilters.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

// Match each card's data-category to the selected button's data-filter.
function filterProjects(event) {
  const selectedButton = event.currentTarget;
  const selectedFilter = selectedButton.dataset.filter;

  for (const card of projectCards) {
    const matchesFilter = selectedFilter === "all" || card.dataset.category === selectedFilter;
    card.hidden = !matchesFilter;
  }

  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button === selectedButton));
  }
}

for (const button of filterButtons) {
  button.addEventListener("click", filterProjects);
}

projectFilters.hidden = false;
