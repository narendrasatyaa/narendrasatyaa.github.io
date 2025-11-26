// script.js
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const yearSpan = document.getElementById("year");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

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

  // Mobile menu
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // Filter Projects
  const categoryBtns = document.querySelectorAll(".category-btn");
  const projectCards = document.querySelectorAll(".project-card");

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      // Update active button
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter projects with simple fade
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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});