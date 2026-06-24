function cargarHero() {
    const heroSection = document.querySelector('.hero');

    if (!heroSection) return;

    heroSection.innerHTML = `
        <h1><strong>${heroLoad.title}</strong></h1>
        <h2>${heroLoad.subtitle}</h2>
        <section class="hero-grid">
            <article class="hero-col-left">
                <img src="${heroLoad.columns[0].image}" alt="${heroLoad.columns[0].alt}">
                <p>${heroLoad.columns[0].text}</p>
            </article>
            <figure class="hero-col-center">
                <img src="${heroLoad.columns[1].image}" alt="${heroLoad.columns[1].alt}">
            </figure>
            <article class="hero-col-right">
                <p>${heroLoad.columns[2].text}</p>
                <img src="${heroLoad.columns[2].image}" alt="${heroLoad.columns[2].alt}">
            </article>
            <h3><a href="${heroLoad.cta.link}">${heroLoad.cta.label}</a></h3>
        </section>
    `;
}

async function inicializarIndex() {
    await cargarDatos();
    cargarHero();
}

document.addEventListener('DOMContentLoaded', inicializarIndex);