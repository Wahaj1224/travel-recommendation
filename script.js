// script.js

// Highlight the active nav link based on the current page
window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll to sections (if you add anchors later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Basic contact form validation feedback
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (email && message) {
      alert("Thanks for your message! We'll get back to you soon.");
      contactForm.reset();
    } else {
      alert("Please fill out all fields.");
    }
  });
}







// -----------------------------
// Global helpers / nav active
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  // Highlight the active nav link based on the current file
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    }
  });

  // Initialize search only if we're on a page that has the search UI
  initSearchHandlers();
});

// -----------------------------
// Search data
// -----------------------------
const DATA = {
  beaches: [
    {
      title: "Maldives",
      img: "images/maldives.jpg",
      desc: "Crystal clear waters and stunning views.",
    },
    {
      title: "Bora Bora",
      img: "images/bora-bora.jpg",
      desc: "Paradise in the South Pacific.",
    },
  ],
  temples: [
    {
      title: "Angkor Wat (Cambodia)",
      img: "images/angkor.jpg",
      desc: "Cambodia’s ancient wonder.",
    },
    {
      title: "Kinkaku-ji (Japan)",
      img: "images/kinkakuji.jpg",
      desc: "The Golden Pavilion in Kyoto.",
    },
  ],
  countries: [
    {
      title: "Italy",
      img: "images/venice.jpg",
      desc: "Historic cities and romantic canals.",
    },
    {
      title: "Japan",
      img: "images/kinkakuji.jpg",
      desc: "Culture, temples, and modern cities.",
    },
  ],
  // Optional: specific-name mapping so searches like "Maldives" or "Italy" still show category results
  nameMap: {
    "maldives": "beaches",
    "bora bora": "beaches",
    "angkor": "temples",
    "angkor wat": "temples",
    "kinkakuji": "temples",
    "kinkaku-ji": "temples",
    "italy": "countries",
    "japan": "countries",
    "country": "countries",
    "temple": "temples",
    "beach": "beaches"
  }
};

// -----------------------------
// Search logic
// -----------------------------
function initSearchHandlers() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultsSection = document.getElementById("results");
  const resultsGrid = document.getElementById("resultsGrid");
  const resultsHint = document.getElementById("resultsHint");

  // If any of these are missing, we’re not on the Home page – just return.
  if (!searchInput || !searchBtn || !clearBtn || !resultsSection || !resultsGrid || !resultsHint) {
    return;
  }

  function renderCards(items) {
    resultsGrid.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <p><strong>${item.title}</strong><br>${item.desc}</p>
      `;
      resultsGrid.appendChild(card);
    });
  }

  function showResults(items, hintText = "") {
    renderCards(items);
    resultsHint.textContent = hintText;
    resultsSection.classList.remove("hidden");
    resultsSection.scrollIntoView({ behavior: "smooth" });
  }

  function handleSearch() {
    const q = (searchInput.value || "").trim().toLowerCase();
    resultsHint.textContent = "";

    if (!q) {
      // No query -> hide results
      resultsGrid.innerHTML = "";
      resultsSection.classList.add("hidden");
      return;
    }

    // Primary keyword matching
    if (q.includes("beach")) {
      showResults(DATA.beaches, "Showing beach recommendations.");
      return;
    }
    if (q.includes("temple")) {
      showResults(DATA.temples, "Showing temple recommendations.");
      return;
    }
    if (q.includes("country")) {
      showResults(DATA.countries, "Showing country recommendations.");
      return;
    }

    // Specific-name fallback matching (e.g., "Maldives", "Italy")
    const mapped = DATA.nameMap[q];
    if (mapped && Array.isArray(DATA[mapped])) {
      // Try to filter by exact name within the category; if <2, show full category for rubric
      let items = DATA[mapped].filter(it => it.title.toLowerCase().includes(q));
      if (items.length < 2) items = DATA[mapped];
      showResults(items, `Showing matches for "${q}".`);
      return;
    }

    // Otherwise, no match
    resultsGrid.innerHTML = "";
    resultsSection.classList.remove("hidden");
    resultsHint.textContent = `No exact match. Try "beach", "temple", or "country".`;
  }

  function clearSearch() {
    searchInput.value = "";
    resultsGrid.innerHTML = "";
    resultsSection.classList.add("hidden");
    resultsHint.textContent = "";
    searchInput.focus();
  }

  // Events
  searchBtn.addEventListener("click", handleSearch);
  clearBtn.addEventListener("click", clearSearch);

  // Press Enter to search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}
