document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".grid-cols-2").classList.remove("grid-cols-2");
  document.querySelectorAll(".max-w-sm").forEach((e) => {
    e.classList.remove("max-w-sm");
  });
});
setTimeout(() => {
  document.querySelector(".grid-cols-2").classList.remove("grid-cols-2");
  document.querySelectorAll(".max-w-sm").forEach((e) => {
    e.classList.remove("max-w-sm");
  });
}, 1000);
