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
