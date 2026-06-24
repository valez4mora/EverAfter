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

async function inicializarPaquetesPage() {
    await cargarDatos();
    cargarFavorites();
    inicializarPaquetes();
}

document.addEventListener('DOMContentLoaded', inicializarPaquetesPage);