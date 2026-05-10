/*
  FINAL SHOWPIECE MOTION
  Lightweight, no dependencies.
*/

const spotlight = document.querySelector(".spotlight");

window.addEventListener("pointermove", (event) => {
  if (!spotlight) return;
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
});

const revealTargets = [
  ...document.querySelectorAll(".section-intro, .exhibit, .wall-copy, .frame, .tattoo-copy, .big-type, .launch-grid article, .final-pitch")
];

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealTargets.forEach((el) => observer.observe(el));

document.querySelectorAll(".preview-card, .frame, .launch-grid article").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
