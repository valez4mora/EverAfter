let pasoActual = 1;
let paqueteSeleccionado = null;
let invitadosPorPaquete = {};

function irAlPaso(numero) {
    document.querySelectorAll('.form-step').forEach(function (step) {
        step.classList.remove('active');
    });

    document.getElementById('step' + numero).classList.add('active');
    pasoActual = numero;

    if (numero === 2) {
        renderPackagePicker();
    }

    if (numero === 3) {
        renderSummary();
    }

    if (numero === 4) {
        renderConfirmation();
    }

    actualizarEstructura(numero);
}

function actualizarEstructura(numero) {
    const mosaic = document.querySelector('.mosaic-right');
    const mosaicSection = document.querySelector('.mosaic-section');
    const step4 = document.getElementById('step4');


    if (numero === 4 || numero === 2) {
        mosaic.classList.add('hidden');
        mosaicSection.classList.add('column');
    } else {
        mosaic.classList.remove('hidden');
        mosaicSection.classList.remove('column');
    }
    if (numero === 1 || numero === 2 || numero === 3) {
        step4.classList.add('hidden')
    } else {
        step4.classList.remove('hidden')
    }
}

function manejarClickCard(paqueteId) {
    paqueteSeleccionado = paqueteId;
    renderPackagePicker();
}

function manejarClickNext() {
    const mensajeError = document.getElementById('step2-error');

    if (!paqueteSeleccionado) {
        mensajeError.textContent = 'Please select a package to continue.';
        return;
    }

    mensajeError.textContent = '';
    irAlPaso(3);
}

function guardarCantidadInvitados(paqueteId, cantidad, maxInvitados) {
    if (isNaN(cantidad) || cantidad < 1) {
        cantidad = 1;
    }
    if (cantidad > maxInvitados) {
        cantidad = maxInvitados;
    }
    invitadosPorPaquete[paqueteId] = cantidad;
}

function calcularPrecioPorInvitados(paquete, cantidadInvitados) {
    const porcentajeBase = 0.65;

    const costoBase = paquete.precio * porcentajeBase;
    const costoVariableTotal = paquete.precio - costoBase;
    const costoPorInvitado = costoVariableTotal / paquete.maxInvitados;
    const costoVariableActual = costoPorInvitado * cantidadInvitados;

    return Math.round(costoBase + costoVariableActual);
}

function crearMiniCard(paquete) {
    const card = document.createElement('li');
    card.className = 'mini-package-card';

    if (paqueteSeleccionado === paquete.id) {
        card.classList.add('selected');
    }

    const invitadosActuales = invitadosPorPaquete[paquete.id] || paquete.invitados || 1;
    const precioActual = calcularPrecioPorInvitados(paquete, invitadosActuales);

    card.innerHTML = `
        <div class="mpc-header">
            <span class="mpc-name">${paquete.nombre}</span>
            <span class="mpc-price" id="price-${paquete.id}">$${precioActual}</span>
        </div>
        <p class="mpc-location">${paquete.lugar}</p>
        <p class="mpc-desc">${paquete.descripcion}</p>
        <p class="mpc-includes"><strong>Includes:</strong> ${paquete.incluye.join(', ')}</p>
        <label class="mpc-guests-label" for="guests-${paquete.id}">
            Number of guests (max ${paquete.maxInvitados})
        </label>
        <input
            type="number"
            class="mpc-guests-input"
            id="guests-${paquete.id}"
            min="1"
            max="${paquete.maxInvitados}"
            value="${invitadosActuales}"
        >
    `;

    card.addEventListener('click', function (e) {
        if (e.target.classList.contains('mpc-guests-input')) {
            return;
        }
        manejarClickCard(paquete.id);
    });

    const inputInvitados = card.querySelector('.mpc-guests-input');

    inputInvitados.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    inputInvitados.addEventListener('input', function (e) {
        let cantidad = parseInt(e.target.value, 10);

        if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 1;
        }
        if (cantidad > paquete.maxInvitados) {
            cantidad = paquete.maxInvitados;
            e.target.value = cantidad;
        }

        guardarCantidadInvitados(paquete.id, cantidad, paquete.maxInvitados);

        const nuevoPrecio = calcularPrecioPorInvitados(paquete, cantidad);
        document.getElementById('price-' + paquete.id).textContent = '$' + nuevoPrecio;
    });

    return card;
}

function renderPackagePicker() {
    const contenedor = document.getElementById('package-picker');

    if (!contenedor) return;

    contenedor.innerHTML = '';

    paquetes.forEach(function (paquete) {
        contenedor.appendChild(crearMiniCard(paquete));
    });

    const btnNext = document.getElementById('btnNextStep2');

    if (btnNext) {
        btnNext.onclick = manejarClickNext;
    }
}

function renderSummary() {
    const paquete = paquetes.find(function (p) {
        return p.id === paqueteSeleccionado;
    });

    const nombre1 = document.getElementById('name1').value;
    const nombre2 = document.getElementById('name2').value;
    const fecha = document.getElementById('date').value;
    const invitados = invitadosPorPaquete[paqueteSeleccionado] || 1;
    const precioFinal = calcularPrecioPorInvitados(paquete, invitados);

    document.getElementById('summary-details').innerHTML = `
        <strong>Partners:</strong> ${nombre1} & ${nombre2}<br>
        <strong>Date:</strong> ${fecha}<br>
        <strong>Package:</strong> ${paquete.nombre}<br>
        <strong>Location:</strong> ${paquete.lugar}<br>
        <strong>Guests:</strong> ${invitados} / ${paquete.maxInvitados}<br>
        <strong>Total price:</strong> $${precioFinal}
    `;
}

function manejarSubmitForm(e) {
    e.preventDefault();

    const reserva = {
        nombre1: document.getElementById('name1').value,
        nombre2: document.getElementById('name2').value,
        fecha: document.getElementById('date').value,
        paqueteId: paqueteSeleccionado,
        invitados: invitadosPorPaquete[paqueteSeleccionado] || 1,
        fechaEnvio: new Date().toISOString()
    };

    localStorage.setItem('reservaActual', JSON.stringify(reserva));

    irAlPaso(4);
}

function renderConfirmation() {
    const reserva = JSON.parse(localStorage.getItem('reservaActual'));

    if (!reserva) return;

    const paquete = paquetes.find(function (p) {
        return p.id === reserva.paqueteId;
    });

    if (!paquete) return;

    const precioFinal = calcularPrecioPorInvitados(paquete, reserva.invitados);
    const contenedor = document.getElementById('confirmation-container');

    contenedor.innerHTML = `
        <div class="confirmation-text">
            <h2 class="confirmation-title">Your Wedding Is Booked!</h2>

            <article class="summary-block">
                <div class="summary-block-header">
                    <h3>Your Details</h3>
                </div>
                <p><strong>Partners:</strong> ${reserva.nombre1} & ${reserva.nombre2}</p>
                <p><strong>Date:</strong> ${reserva.fecha}</p>
            </article>

            <article class="summary-block">
                <div class="summary-block-header">
                    <h3>Your Package</h3>
                </div>
                <p><strong>Guests:</strong> ${reserva.invitados} / ${paquete.maxInvitados}</p>
                <p><strong>Total price:</strong> $${precioFinal}</p>
                <button type="button" class="edit-btn" onclick="editarReserva()">Edit</button>
                <button type="button" class="edit-btn" onclick="window.location.href='menu.html'">Continue</button>
            </article>
        </div>

        <div class="confirmation-card" id="package-summary-block"></div>
    `;

    const detalleOriginal = mostrarDetalle(paquete.id);

    if (detalleOriginal) {
        const detalleClonado = detalleOriginal.cloneNode(true);
        detalleClonado.removeAttribute('id');
        detalleClonado.style.display = 'block';
        document.getElementById('package-summary-block').appendChild(detalleClonado);
    }
}

function editarReserva() {
    const reserva = JSON.parse(localStorage.getItem('reservaActual'));

    if (!reserva) return;

    document.getElementById('name1').value = reserva.nombre1;
    document.getElementById('name2').value = reserva.nombre2;
    document.getElementById('date').value = reserva.fecha;

    paqueteSeleccionado = reserva.paqueteId;
    invitadosPorPaquete[reserva.paqueteId] = reserva.invitados;

    irAlPaso(1);
}

function inicializarForm() {
    const weddingForm = document.getElementById('weddingForm');

    if (weddingForm) {
        weddingForm.addEventListener('submit', manejarSubmitForm);
    }

    const reservaExistente = localStorage.getItem('reservaActual');

    if (reservaExistente) {
        const reserva = JSON.parse(reservaExistente);
        paqueteSeleccionado = reserva.paqueteId;
        invitadosPorPaquete[reserva.paqueteId] = reserva.invitados;
        irAlPaso(4);
    }
}

async function inicializarFormPage() {
    await cargarDatos();
    inicializarForm();
}

document.addEventListener('DOMContentLoaded', inicializarFormPage);