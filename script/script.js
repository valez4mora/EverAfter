const slides = document.querySelectorAll(".slide");

let indice = 0;

function cambiarSlide() {

    slides[indice].classList.remove("activo");

    indice++;

    if (indice >= slides.length) {
        indice = 0;
    }

    slides[indice].classList.add("activo");
}

setInterval(cambiarSlide, 5000);


//boton Nav
const btnNav = document.getElementById("btnNav");
const menu = document.getElementById("navMenu");

btnNav.addEventListener("click", () => {

    menu.classList.toggle("activo");

});
//