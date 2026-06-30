function inicializarMenu() {
    const reserva = JSON.parse(localStorage.getItem('reservaActual'));

    if (!reserva) return;

    const names = reserva.nombre1 + ' & ' + reserva.nombre2;

    document.getElementById('hero-names').textContent = names;
    document.getElementById('p-greeting').textContent = 'Hello, ' + names + '!';

    const dateObj = new Date(reserva.fecha + 'T00:00:00');
    document.getElementById('c-date').textContent = dateObj.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const now = new Date();
    const diff = dateObj - now;
    const days = Math.max(0, Math.floor(diff / 86400000));

    document.getElementById('countdown').innerHTML = `
        <div class="c-box"><div class="c-num">${Math.floor(days / 30.44)}</div><div class="c-lbl">Months</div></div>
        <div class="c-box"><div class="c-num">${Math.floor(days / 7)}</div><div class="c-lbl">Weeks</div></div>
        <div class="c-box"><div class="c-num">${days}</div><div class="c-lbl">Days</div></div>
    `;
}

// Solo en index.js o donde cargue el index
function inicioALRegistrar() {
    const registro = localStorage.getItem("reservaActual");

    if (!registro) {
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", inicioALRegistrar);

document.addEventListener('DOMContentLoaded', inicializarMenu);