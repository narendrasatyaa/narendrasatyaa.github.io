// script.js
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const yearSpan = document.getElementById("year");

  // Set tahun
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Dark mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    html.classList.add("dark");
  }
  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  });

  // Filter Projects
  const categoryBtns = document.querySelectorAll(".category-btn");
  const projectCards = document.querySelectorAll(".project-card");

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      // Update active button
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter projects
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.classList.remove("hidden");
          card.style.display = "";
        } else {
          card.classList.add("hidden");
          card.style.display = "none";
        }
      });
    });
  });
});