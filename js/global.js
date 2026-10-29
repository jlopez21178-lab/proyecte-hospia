function classToggle(item, ...className) {
  className.forEach((cl) => item.classList.toggle(cl));
}

const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const fullBg = document.getElementsByClassName("full-bg-black")[0];
const nav = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  classToggle(menuIcon, "ph-list", "ph-x");
  menuList.classList.toggle("hidden");
  fullBg.classList.toggle("hidden");

  // Si el bg no esta oculto que no permita desplazarse
  if (!fullBg.classList.contains("hidden")) {
  }
});
