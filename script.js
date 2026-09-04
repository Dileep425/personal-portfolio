const canvas = document.querySelector(".starfield");
const ctx = canvas.getContext("2d");
const cursorGlow = document.querySelector(".cursor-glow");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let stars = [];
let width = 0;
let height = 0;
let animationFrame;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  stars = Array.from({ length: Math.min(180, Math.floor(width * height / 8200)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + .3,
    speed: Math.random() * .22 + .04,
    alpha: Math.random() * .7 + .25,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.y += star.speed;
    if (star.y > height + 4) {
      star.y = -4;
      star.x = Math.random() * width;
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(210, 235, 255, ${star.alpha})`;
    ctx.shadowColor = "rgba(115, 247, 255, .8)";
    ctx.shadowBlur = star.size * 5;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  if (!reduceMotion) animationFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("pointermove", (event) => {
  cursorGlow.style.setProperty("--x", `${event.clientX}px`);
  cursorGlow.style.setProperty("--y", `${event.clientY}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .timeline-item, .toolkit-card, .quote").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});
