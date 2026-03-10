// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme
const html = document.documentElement;
const btn = document.getElementById("themeToggle");
const ico = document.getElementById("themeIco");

if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  ico.className = "fas fa-sun";
}

btn.addEventListener("click", () => {
  html.classList.toggle("dark");
  const dark = html.classList.contains("dark");
  ico.className = dark ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Dock active
const secs = [
  "home",
  "projects",
  "about",
  "experience",
  "honors",
  "faq",
  "contact",
];
const links = document.querySelectorAll(".dock-link[data-s]");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        const a = document.querySelector(`.dock-link[data-s="${e.target.id}"]`);
        if (a) a.classList.add("active");
      }
    });
  },
  { threshold: 0.25 },
);
secs.forEach((id) => {
  const el = document.getElementById(id);
  if (el) obs.observe(el);
});

// Project filter
const catBtns = document.querySelectorAll(".cat-btn");
const cards = document.querySelectorAll(".pcard");

filterCat("selected");

catBtns.forEach((b) =>
  b.addEventListener("click", () => {
    catBtns.forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    filterCat(b.getAttribute("data-cat"));
  }),
);

function filterCat(cat) {
  cards.forEach((c) => {
    const cc = c.getAttribute("data-cat");
    const tags = c.getAttribute("data-tags") || "";
    const show =
      cat === "all" ||
      (cat === "selected" && tags.includes("selected")) ||
      cc === cat;
    if (show) {
      c.style.display = "flex";
      setTimeout(() => c.classList.remove("hidden"), 30);
    } else {
      c.classList.add("hidden");
      setTimeout(() => {
        if (c.classList.contains("hidden")) c.style.display = "none";
      }, 450);
    }
  });
}

// FAQ
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((f) => f.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

// Responsive about grid
function setAboutGrid() {
  const ag = document.querySelector(".about-grid");
  if (!ag) return;
  ag.style.gridTemplateColumns = window.innerWidth < 768 ? "1fr" : "1fr 1fr";
}
window.addEventListener("resize", setAboutGrid);
setAboutGrid();
