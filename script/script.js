
const header = document.getElementById("main-header");
const hero = document.querySelector(".hero");

const logos = document.querySelectorAll(".logo");
const home = document.getElementById("home");

const btnNav = document.getElementById("btnNav");
const menu = document.getElementById("navMenu");

const data = {
    "Entretenimiento": ["DJ", "Banda en vivo", "Show de magia", "Animador"],
    "Belleza y salud": ["Maquillaje novia", "Peinado novia", "Spa prenupcial", "Manicure y pedicure"],
    "Pastelería": ["Pastel de boda", "Cupcakes", "Mesa de postres", "Cake pops"],
    "Catering": ["Menú completo", "Cóctel de bienvenida", "Barra de bebidas", "Meseros"],
    "Música": ["Cuarteto de cuerdas", "Solista", "Sonido y luces", "Piano en vivo"],
    "Vestimenta": ["Vestido de novia", "Traje del novio", "Velos y accesorios", "Zapatos"],
    "Flores": ["Bouquet nupcial", "Centros de mesa", "Decoración floral", "Arco floral"],
    "Fotografía": ["Fotógrafo profesional", "Video de boda", "Álbum fotográfico", "Fotomatón"],
    "Transporte": ["Limusina", "Auto clásico", "Transporte invitados", "Helicóptero"],
    "Espacio": ["Salón de eventos", "Jardín privado", "Hacienda", "Terraza panorámica"],
    "Otros": ["Fuegos artificiales", "Recuerdos", "Globos", "Libro de firmas"]
};
const state = {};


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



//crear item en la categoria
function crearItem(item) {
    state[item] = { estimado: '', abonado: '', real: '', pendiente: '' };
    const li = document.createElement('li');
    li.innerHTML = `
    <p>${item}</p>
    ${['estimado', 'abonado', 'real', 'pendiente'].map(campo => `
      <label>${campo} <input type="text" placeholder="—"
        onchange="state['${item}'].${campo}=this.value; updateTotals()"></label>`).join('')}`;
    return li;
}


//cargar categorias
function cargarCategorias() {
    document.querySelectorAll('.category').forEach(cat => {
        const items = data[cat.dataset.cat] || [];
        const ul = cat.querySelector('ul');
        items.forEach(item => ul.appendChild(crearItem(item)));
    });
}

//abrir categoria
function toggle(section) {
    section.parentElement.classList.toggle('open');
}

//busqueda limpia
function clearSearch() {
    document.getElementById('searchInput').value = '';
    filtrar('');
}

//busqueda
function filtrar(texto) {
    texto = texto.toLowerCase().trim();
    let hayResultados = false;

    document.querySelectorAll('.category').forEach(cat => {
        const catName = cat.dataset.cat.toLowerCase();
        let visibles = 0;

        cat.querySelectorAll('li').forEach(li => {
            const match = !texto || li.querySelector('p').textContent.toLowerCase().includes(texto) || catName.includes(texto);
            li.style.display = match ? '' : 'none';
            if (match) visibles++;
        });

        cat.style.display = visibles ? '' : 'none';
        if (texto && visibles) cat.classList.add('open');
        if (!texto) cat.classList.remove('open');
        if (visibles) hayResultados = true;
    });

    document.getElementById('noResults').style.display = hayResultados ? 'none' : 'block';
}


// eventos
window.addEventListener("scroll", cambiarColorHeader);

logos.forEach(logo => {
    logo.addEventListener("click", irAlInicio);
});

btnNav.addEventListener("click", mostrarMenu);

cargarCategorias();
document.getElementById('searchInput').addEventListener('input', e => filtrar(e.target.value));