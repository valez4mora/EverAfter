let paquetes = [];
let heroLoad = {};

async function cargarDatos() {
    try {
        const [resPaquetes, resHero] = await Promise.all([
            fetch('data/paquetes.json'),
            fetch('data/hero.json')
        ]);

        paquetes = await resPaquetes.json();
        heroLoad = await resHero.json();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}