function classToggle(item, ...className) {
  className.forEach((cl) => item.classList.toggle(cl));
}

const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const nav = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  classToggle(menuIcon, "ph-list", "ph-x");
  menuList.classList.toggle("hidden");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    menuIcon.classList = "ph-list ph";
    menuList.classList.remove("hidden");
    menuList.classList.remove("container");
  } else {
    menuList.classList.add("hidden");
    menuList.classList.add("container");
  }
});
