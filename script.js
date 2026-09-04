const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("dileep-theme");

if (savedTheme === "dark") document.body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dileep-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .timeline-item, .toolkit-card").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});
