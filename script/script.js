
const header = document.getElementById("main-header");
const hero = document.querySelector(".hero");

const logos = document.querySelectorAll(".logo");
const home = document.getElementById("home");

const btnNav = document.getElementById("btnNav");
const menu = document.getElementById("navMenu");

const paquetes = [
    {
        id: 1,
        imagen: "resources/home.jpg",
        nombre: "Classic Romance",
        categoria: "Classic",
        precio: 2500,
        invitados: 100,
        descripcion: "Perfect package for intimate weddings.",
        incluye: ["DJ", "Photography", "Wedding Cake"],
        favorite: false
    },
    {
        id: 2,
        imagen: "resources/home.jpg",
        nombre: "Luxury Dream",
        categoria: "Premium",
        precio: 5000,
        invitados: 200,
        descripcion: "Luxury wedding experience.",
        incluye: ["Live Band", "Video", "Premium Decoration"],
        favorite: false
    },
    {
        id: 3,
        imagen: "resources/home.jpg",
        nombre: "Garden Bliss",
        categoria: "Outdoor",
        precio: 3500,
        invitados: 150,
        descripcion: "Ideal for garden ceremonies.",
        incluye: ["Floral Arch", "DJ", "Photography"],
        favorite: false
    },
    {
        id: 4,
        imagen: "resources/home.jpg",
        nombre: "Beach Escape",
        categoria: "Beach",
        precio: 4200,
        invitados: 120,
        descripcion: "Romantic beach wedding.",
        incluye: ["Beach Setup", "Photography", "Cocktail Service"],
        favorite: false
    },
    {
        id: 5,
        imagen: "resources/home.jpg",
        nombre: "Royal Elegance",
        categoria: "Premium",
        precio: 6500,
        invitados: 250,
        descripcion: "Sophisticated luxury wedding with exclusive services.",
        incluye: [
            "Live Orchestra",
            "Premium Decoration",
            "Professional Video",
            "Luxury Catering"
        ],
        favorite: false
    },
    {
        id: 6,
        imagen: "resources/home.jpg",
        nombre: "Sunset Paradise",
        categoria: "Beach",
        precio: 4800,
        invitados: 140,
        descripcion: "Celebrate your wedding with a breathtaking sunset view.",
        incluye: [
            "Beach Ceremony",
            "Cocktail Reception",
            "Photography",
            "Wedding Cake"
        ],
        favorite: false
    },
    {
        id: 7,
        imagen: "resources/home.jpg",
        nombre: "Forest Fairytale",
        categoria: "Outdoor",
        precio: 3900,
        invitados: 130,
        descripcion: "A magical wedding surrounded by nature.",
        incluye: [
            "Floral Decoration",
            "DJ",
            "Photography",
            "Garden Reception"
        ],
        favorite: false
    },
    {
        id: 8,
        imagen: "resources/home.jpg",
        nombre: "Golden Memories",
        categoria: "Classic",
        precio: 3100,
        invitados: 120,
        descripcion: "Traditional wedding package with timeless elegance.",
        incluye: [
            "Photography",
            "Wedding Cake",
            "DJ",
            "Formal Decoration"
        ],
        favorite: false
    },
    {
        id: 9,
        imagen: "resources/home.jpg",
        nombre: "Diamond Celebration",
        categoria: "Premium",
        precio: 7200,
        invitados: 300,
        descripcion: "Our most exclusive package for unforgettable celebrations.",
        incluye: [
            "Live Band",
            "Luxury Catering",
            "Premium Decoration",
            "Drone Video"
        ],
        favorite: false
    },
    {
        id: 10,
        imagen: "resources/home.jpg",
        nombre: "Ocean Breeze",
        categoria: "Beach",
        precio: 4500,
        invitados: 160,
        descripcion: "Elegant seaside wedding with a relaxed atmosphere.",
        incluye: [
            "Beach Setup",
            "Photography",
            "Cocktail Service",
            "Live Music"
        ],
        favorite: false
    }
];


// color header
function cambiarColorHeader() {
    const heroTop = hero.offsetTop;

    if (window.scrollY >= heroTop) {
        header.classList.add("hero-color");
    } else {
        header.classList.remove("hero-color");
    }
}

// clic logo
function irAlInicio() {
    if (window.location.pathname.includes("budget.html")) {
        window.location.href = "index.html";
    }
    else {
        home.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// botón nav
function mostrarMenu() {
    menu.classList.toggle("activo");
}

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

function obtenerBusqueda() {
    return document
        .getElementById("searchInput")
        ?.value
        .toLowerCase() || "";
}

function obtenerCategoria() {
    return document
        .getElementById("filterCategory")
        ?.value || "all";
}

function obtenerContainer() {
    return document.getElementById("packages-container");
}

function filtrarPaquetes() {

    const search = obtenerBusqueda();
    const category = obtenerCategoria();

    return paquetes.filter(paquete => {

        const nombreMatch =
            paquete.nombre
                .toLowerCase()
                .includes(search);

        const categoriaMatch =
            category === "all" ||
            paquete.categoria === category ||
            category === "Favorites" && paquete.favorite;


        return nombreMatch && categoriaMatch;
    });
}

function crearCard(paquete) {

    const textoFavorito =
        paquete.favorite
            ? "Unfavorite ❤"
            : "Favorite ❤";
    const card = document.createElement("article");

    card.className = "package-card";
    card.onclick = () => mostrarDetalle(paquete.id);
    card.innerHTML = `
        
        <h3>${paquete.nombre}</h3>

        <p> Category: ${paquete.categoria}</p>

        <p>Price: $${paquete.precio}</p>

        

        <div class="card-footer">

        <button onclick="event.stopPropagation();
            agregarFavorito(${paquete.id})">
            ${textoFavorito}
        </button>

</div>`;
    return card;
}

function renderPackages() {

    const container = obtenerContainer();

    if (!container) return;

    container.innerHTML = "";

    const filtrados = filtrarPaquetes();

    filtrados.forEach(paquete => {
        container.appendChild(
            crearCard(paquete)
        );
    });
}

function mostrarDetalle(id) {

    const paquete =
        paquetes.find(p => p.id === id);

    if (!paquete) return;

    const detalle =
        document.getElementById("package-details");

    detalle.innerHTML = `
        <section class = "details-card">
        <img
            src="${paquete.imagen}"
            alt="${paquete.nombre}"
            class="package-image">
        <h2>${paquete.nombre}</h2>

        <p class = "description">${paquete.descripcion}</p>
        
        <p>Services:</p>
        <ul>
            ${paquete.incluye
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
        <br>

        <p>
            <strong>Price:</strong>
            $${paquete.precio}
        </p>

        <p>
            <strong>Guests:</strong>
            ${paquete.invitados}
        </p>

        
        </section>
    `;
}

function guardarfavorites() {

    const favorites = paquetes
        .filter(paquete => paquete.favorite)
        .map(paquete => paquete.id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function agregarFavorito(id) {

    const paquete =
        paquetes.find(p => p.id === id);

    if (!paquete) return;

    paquete.favorite = !paquete.favorite;

    guardarfavorites();

    renderPackages();
}
function cargarFavorites() {

    const favoritesGuardados =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    paquetes.forEach(paquete => {

        paquete.favorite =
            favoritesGuardados.includes(paquete.id);
    });
}

function configurarEventosBusqueda() {

    const input =
        document.getElementById("searchInput");

    const select =
        document.getElementById("filterCategory");

    if (input) {
        input.addEventListener(
            "input",
            renderPackages
        );
    }

    if (select) {
        select.addEventListener(
            "change",
            renderPackages
        );
    }
}

function clearSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    input.value = "";

    renderPackages();
}

function inicializarPaquetes() {

    if (!obtenerContainer()) return;

    renderPackages();

    configurarEventosBusqueda();
}




// eventos
window.addEventListener("scroll", cambiarColorHeader);

logos.forEach(logo => {
    logo.addEventListener("click", irAlInicio);
});

btnNav.addEventListener("click", mostrarMenu);
cargarFavorites();
inicializarPaquetes();
document.getElementById('searchInput').addEventListener('input', e => filtrar(e.target.value));
