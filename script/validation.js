// regex que unicamente permite letras, acentos y espacios
const regex = /^[a-zA-ZÀ-ÿñÑ\s]*$/;

//valida con el regex, y si no es un caracter permitido lo escribe vacio
function bloquearCaracteresInvalidos(input) {
    input.addEventListener('input', function (e) {
        const valor = e.target.value;

        if (!regex.test(valor)) {
            e.target.value = valor.replace(/[^a-zA-ZÀ-ÿñÑ\s]/g, '');
        }
    });
}

// Valida que un campo de nombre no esté vacío y no sean espacios
function validarNombre(valor) {
    return valor.trim().length > 0;
}

// Valida que la fecha exista y no sea anterior a hoy 
function validarFecha(valorFecha) {
    if (!valorFecha) return false;

    const fechaSeleccionada = new Date(valorFecha + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada >= hoy;
}

//validar los campos del step 1
function validarStep1() {
    const inputNombre1 = document.getElementById('name1');
    const inputNombre2 = document.getElementById('name2');
    const inputFecha = document.getElementById('date');

    const nombre1 = inputNombre1.value;
    const nombre2 = inputNombre2.value;
    const fecha = inputFecha.value;

    if (!validarNombre(nombre1)) {
        // Le pasamos 'inputNombre1' como tercer argumento
        mostrarError('Missing names', 'Please enter both partner names.', inputNombre1);
        return false;
    }

    if (!validarNombre(nombre2)) {
        mostrarError('Missing names', 'Please enter both partner names.', inputNombre2);
        return false;
    }

    if (!validarFecha(fecha)) {
        mostrarError('Invalid date', 'Please choose a valid date (today or later).', inputFecha);
        return false;
    }

    return true;
}
const step1 = document.getElementById("step1");

step1.addEventListener("keydown", function (e) { 
    if (e.key === "Enter") {
        e.preventDefault();

        if (validarStep1()) {
            irAlPaso(2);
        }
    }
});
//validar step 2 o seleccion de paquete
function validarStep2() {
    if (!paqueteSeleccionado) {
        mostrarError('No package selected', 'Please select a package to continue.');
        return false;
    }

    return true;
}

//mostrar el error
function mostrarError(titulo, mensaje, elementoAEnfocar = null) {
    Swal.fire({
        icon: "error",
        title: titulo,
        text: mensaje,
        background: "#ffffffea",
        color: "#250902",
        confirmButtonColor: "transparent",
        customClass: {
            popup: 'swal-everafter-popup',
            title: 'swal-everafter-title',
            confirmButton: 'swal-everafter-btn'
        },
        didClose: () => {
            if (elementoAEnfocar) {
                setTimeout(() => {
                    elementoAEnfocar.focus();
                }, 100);
            }
        }
    });
}

//inicializar eventos 
function inicializarValidaciones() {
    const inputNombre1 = document.getElementById('name1');
    const inputNombre2 = document.getElementById('name2');

    if (inputNombre1) bloquearCaracteresInvalidos(inputNombre1);
    if (inputNombre2) bloquearCaracteresInvalidos(inputNombre2);
}

document.addEventListener('DOMContentLoaded', inicializarValidaciones);