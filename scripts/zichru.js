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
}, 100);

// document.body.addEventListener("click", () => {
//   const screen = document.querySelector(".z-80");
//   screen && screen.remove();
// });
