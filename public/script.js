const hamburgerWrap = document.querySelector(".ham-wrap");
// const hamburger = document.querySelector(".header nav ul.hov");
const headUl = document.querySelector("header nav ul");
const headLi = document.querySelector("header li");
const HeadNav = document.querySelector("header nav");
const hamburger = document.querySelector(".hamburger");
hamburgerWrap.addEventListener("click", () => {
  if (hamburger.classList.contains("hov")) {
    hamburger.classList.remove("hov");
    headLi.classList.remove("hov");
    headUl.classList.remove("hov");
    HeadNav.classList.remove("hov");
  } else {
    hamburger.classList.add("hov");
    headLi.classList.add("hov");
    headUl.classList.add("hov");
    HeadNav.classList.add("hov");
  }
});
