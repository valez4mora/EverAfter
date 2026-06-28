const header = document.getElementById("main-header");
const logos = document.querySelectorAll(".logo");
const btnNav = document.getElementById("btnNav");
const menu = document.getElementById("navMenu");

// color header al hacer scroll 
function cambiarColorHeader() {
    const hero = document.querySelector(".hero");

    if (!hero) return;

    const heroTop = hero.offsetTop;

    if (window.scrollY >= heroTop) {
        header.classList.add("hero-color");
    } else {
        header.classList.remove("hero-color");
    }
}

// clic logo
function irAlInicio() {
    const home = document.getElementById("home");

    if (window.location.pathname.includes("budget.html")) {
        window.location.href = "index.html";
    }
    else if (home) {
        home.scrollIntoView({
            behavior: "smooth"
        });
    }
    else {
        window.location.href = "index.html";
    }
}

// botón nav movil
function mostrarMenu() {
    menu.classList.toggle("activo");
}

// card de detalle de un paquete 
function mostrarDetalle(id) {

    const paquete =
        paquetes.find(p => p.id === id);

    if (!paquete) return;

    const detalle =
        document.getElementById("package-details");

    const esMobile = window.innerWidth <= 700;

    const contenedorListaExiste = document.getElementById('packages-container') !== null;
    const botonVolver = (esMobile && contenedorListaExiste)
        ? `<button class="back-to-list" onclick="volverALaLista()">← Back to list</button>`
        : '';

    detalle.innerHTML = `
        ${botonVolver}
        <section class="details-card">
        <img
            src="${paquete.imagen}"
            alt="${paquete.nombre}"
            class="package-image">
        <h2>${paquete.nombre}</h2>

        <p class="description">${paquete.descripcion}</p>

        <p class="details-location">${paquete.lugar}</p>

        <p>Services:</p>
        <ul>
            ${paquete.incluye
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>

        <p>
            <strong>Category:</strong>
            ${paquete.categoria}
        </p>

        <p>
            <strong>Capacity:</strong>
            up to ${paquete.maxInvitados} guests
        </p>

        <p>
            <strong>Price:</strong>
            $${paquete.precio}
        </p>

        </section>
    `;

    if (esMobile) {
        const contenedorLista = document.getElementById('packages-container');
        if (contenedorLista) {
            contenedorLista.classList.add('detail-open');
            detalle.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return detalle;
}

function volverALaLista() {
    document.getElementById('packages-container').classList.remove('detail-open');
    document.getElementById('package-details').classList.remove('active');
}

function inicializarHeaderSolido() {
    const esIndex = window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('/');

    if (!esIndex) {
        header.classList.add('hero-color');
    }
}

// eventos 
window.addEventListener("scroll", cambiarColorHeader);

logos.forEach(logo => {
    logo.addEventListener("click", irAlInicio);
});

if (btnNav) {
    btnNav.addEventListener("click", mostrarMenu);
}
inicializarHeaderSolido();