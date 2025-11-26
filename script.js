document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Dark Mode Logic ---
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  
  // Cek preferensi user yang tersimpan
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    html.classList.add("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
    });
  }

  // --- 2. Mobile Menu Logic ---
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden"); // Tampilkan menu
      if (mobileMenu.style.display === "none" || !mobileMenu.style.display) {
         mobileMenu.style.display = "block";
      } else {
         mobileMenu.style.display = "none";
      }
    });

    // Close menu saat link diklik
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
      });
    });
  }

  // --- 3. Project Filtering Logic (PERBAIKAN UTAMA) ---
  const categoryBtns = document.querySelectorAll(".category-btn");
  const projectCards = document.querySelectorAll(".project-card");

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // a. Hapus class active dari semua tombol
      categoryBtns.forEach(b => {
        b.classList.remove("active");
        b.classList.remove("bg-black", "text-white", "border-black"); // Hapus style aktif (sesuaikan dengan class tailwind kamu)
        // Reset ke style tidak aktif (opsional, tergantung CSS kamu)
      });

      // b. Tambah class active ke tombol yang diklik
      btn.classList.add("active");
      
      // c. Ambil kategori yang dipilih
      const selectedCategory = btn.getAttribute("data-category");

      // d. Filter kartu
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        // Logika: Jika 'all' ATAU kategori kartu cocok dengan yang dipilih
        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.classList.remove("hidden");
          card.style.display = "flex"; // Pastikan tampil flex agar layout tidak rusak
          // Tambahkan animasi fade-in kecil
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.classList.add("hidden");
            card.style.display = "none";
          }, 300); // Tunggu transisi selesai baru hide
        }
      });
    });
  });

  // --- 4. Auto Year Update ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});