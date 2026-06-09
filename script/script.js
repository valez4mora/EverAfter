//color header
const header = document.querySelector("header");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    const heroTop = hero.offsetTop;

    if (window.scrollY >= heroTop) {
        header.classList.add("hero-color");
    } else {
        header.classList.remove("hero-color");
    }
});
//logo
const logos = document.querySelectorAll(".logo");
const home = document.querySelector(".home");

logos.forEach(logo => {
    logo.addEventListener("click", () => {
        home.scrollIntoView({
            behavior: "smooth"
        });
    });
});
//boton Nav

const btnNav = document.getElementById("btnNav");
const menu = document.getElementById("navMenu");

btnNav.addEventListener("click", () => {

    menu.classList.toggle("activo");

});