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
        const nombreMatch = paquete.nombre
            .toLowerCase()
            .includes(search);

        const categoriaMatch =
            category === "all" ||
            paquete.categoria === category ||
            (category === "Favorites" && paquete.favorite);

        return nombreMatch && categoriaMatch;
    });
}

function crearCard(paquete) {
    const textoFav = paquete.favorite ? "♥ Saved" : "♡ Save";
    const card = document.createElement("article");
    card.className = "package-card";
    card.onclick = () => mostrarDetalle(paquete.id);
    card.innerHTML = `
        <div class="card-img">
            <img src="${paquete.imagen}" alt="${paquete.nombre}">
        </div>
        <div class="card-body">
            <div class="card-top">
                <span class="card-name">${paquete.nombre}</span>
                <span class="card-badge">${paquete.categoria}</span>
            </div>
            <div class="card-bottom">
                <span class="card-price">$${paquete.precio.toLocaleString()}</span>
                <button class="${paquete.favorite ? 'fav-btn active' : 'fav-btn'}"
                    onclick="event.stopPropagation(); agregarFavorito(${paquete.id})">
                    ${textoFav}
                </button>
            </div>
        </div>
    `;
    return card;
}

function crearMensajeNoResultados() {
    const mensaje = document.createElement("div");
    mensaje.className = "no-results-message";
    mensaje.innerHTML = `<p>No matches found</p>`;
    return mensaje;
}

function renderPackages() {
    const container = obtenerContainer();
    if (!container) return;

    container.innerHTML = "";

    const filtrados = filtrarPaquetes();
    const search = obtenerBusqueda();
    const category = obtenerCategoria();

    if (filtrados.length === 0 && (search !== "" || category !== "all")) {
        container.appendChild(crearMensajeNoResultados());
        return;
    }

    filtrados.forEach(paquete => {
        container.appendChild(crearCard(paquete));
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
    const paquete = paquetes.find(p => p.id === id);
    if (!paquete) return;

    paquete.favorite = !paquete.favorite;
    guardarfavorites();
    renderPackages();
}

function cargarFavorites() {
    const favoritesGuardados =
        JSON.parse(localStorage.getItem("favorites")) || [];

    paquetes.forEach(paquete => {
        paquete.favorite = favoritesGuardados.includes(paquete.id);
    });
}

function configurarEventosBusqueda() {
    const input = document.getElementById("searchInput");
    const select = document.getElementById("filterCategory");

    if (input) {
        input.addEventListener("input", renderPackages);
    }

    if (select) {
        select.addEventListener("change", renderPackages);
    }
}

function clearSearch() {
    const input = document.getElementById("searchInput");
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

function actualizarVistaPackages() {
    const esMobile = window.innerWidth <= 700;
    const contenedor = document.getElementById('packages-container');
    const detalle = document.getElementById('package-details');

    if (!contenedor || !detalle) return;

    if (!esMobile) {
        contenedor.classList.remove('detail-open');
        detalle.classList.remove('active');

        const boton = detalle.querySelector('.back-to-list');
        if (boton) boton.remove();
    }
}

window.addEventListener('resize', actualizarVistaPackages);
document.addEventListener('DOMContentLoaded', inicializarPaquetesPage);