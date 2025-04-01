let currentPokemonData = null;

<<<<<<< HEAD
function inicializarPokedex() {
    document.getElementById("pokedex-sprite").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
=======
// Inicializar Pokédex en blanco
function inicializarPokedex() {
    document.getElementById("pokedex-sprite").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; // Imagen transparente
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
    document.getElementById("pokedex-name").textContent = "---";
    document.getElementById("pokedex-number").textContent = "---";
    document.getElementById("pokedex-generation").textContent = "---";
    document.getElementById("btn-catch").disabled = true;
}

async function buscarPokemon() {
    const name = document.getElementById("name").value.toLowerCase();
<<<<<<< HEAD

    try {
        const currentPokemonElement = document.getElementById("current-pokemon");
        const nameElement = document.getElementById("pokedex-name");

        currentPokemonElement.style.animation = 'none';
        nameElement.style.animation = 'none';
        void currentPokemonElement.offsetHeight;
=======
    
    try {
        // Resetear animaciones
        const currentPokemonElement = document.getElementById("current-pokemon");
        const nameElement = document.getElementById("pokedex-name");
        
        currentPokemonElement.style.animation = 'none';
        nameElement.style.animation = 'none';
        void currentPokemonElement.offsetHeight; // Trigger reflow
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
        void nameElement.offsetHeight;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
<<<<<<< HEAD

=======
        
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        currentPokemonData = { data, speciesData };
<<<<<<< HEAD

        const pokedexNumber = data.id.toString().padStart(3, '0');
        const generation = getGeneration(data.id);

        document.getElementById("pokedex-sprite").src = data.sprites.other['official-artwork'].front_default;
        nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById("pokedex-number").textContent = pokedexNumber;
        document.getElementById("pokedex-generation").textContent = generation;

        currentPokemonElement.style.animation = 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        nameElement.style.animation = 'namePopIn 0.8s ease-out forwards';

        document.getElementById("btn-catch").disabled = false;
=======
        
        // Actualizar Pokédex
        const pokedexNumber = data.id.toString().padStart(3, '0');
        const generation = getGeneration(data.id);
        
        document.getElementById("pokedex-sprite").src = data.sprites.other['official-artwork'].front_default;
        nameElement.textContent = data.name;
        document.getElementById("pokedex-number").textContent = pokedexNumber;
        document.getElementById("pokedex-generation").textContent = generation;
        
        // Aplicar nuevas animaciones
        currentPokemonElement.style.animation = 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        nameElement.style.animation = 'namePopIn 0.8s ease-out forwards';
        
        document.getElementById("btn-catch").disabled = false;
        
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
    } catch (error) {
        currentPokemonData = null;
        inicializarPokedex();
        showError(error.message);
    }
}

function createPokemonCard(data, speciesData, number, generation) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <h3 class="text-capitalize">${data.name}</h3>
        <img class="pokemon-img" src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
        <p><strong>N.º:</strong> ${number}</p>
        <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Generación:</strong> ${generation}</p>
        <p><strong>Altura:</strong> ${data.height / 10}m</p>
        <p><strong>Peso:</strong> ${data.weight / 10}kg</p>
        <button class="release-btn">Liberar</button>
    `;
<<<<<<< HEAD

    card.querySelector('.release-btn').addEventListener('click', () => {
        card.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            card.remove();
            eliminarDeLocalStorage(data.id);
        }, 500);
    });

=======
    
    // Agregar evento de liberación
    card.querySelector('.release-btn').addEventListener('click', () => {
        card.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => card.remove(), 500);
    });
    
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
    return card;
}

function getGeneration(id) {
    if (id <= 151) return 'I';
    if (id <= 251) return 'II';
    if (id <= 386) return 'III';
    if (id <= 493) return 'IV';
    if (id <= 649) return 'V';
    if (id <= 721) return 'VI';
    if (id <= 809) return 'VII';
    if (id <= 905) return 'VIII';
    return 'IX';
}

function showError(message) {
    const grid = document.getElementById("pokemon-grid");
    const errorMsg = document.createElement('div');
    errorMsg.className = 'alert alert-danger';
    errorMsg.textContent = message;
    grid.prepend(errorMsg);
    errorMsg.style.animation = 'fadeIn 0.5s ease-out';
    setTimeout(() => errorMsg.remove(), 3000);
}
<<<<<<< HEAD

function guardarPokemonEnLocalStorage(pokemonData) {
    let almacenados = JSON.parse(localStorage.getItem("pokemones")) || [];

    if (!almacenados.some(p => p.data.id === pokemonData.data.id)) {
        almacenados.unshift(pokemonData);
        localStorage.setItem("pokemones", JSON.stringify(almacenados));
    }
}

function eliminarDeLocalStorage(id) {
    let almacenados = JSON.parse(localStorage.getItem("pokemones")) || [];
    almacenados = almacenados.filter(p => p.data.id !== id);
    localStorage.setItem("pokemones", JSON.stringify(almacenados));
}

function cargarPokemonesDesdeLocalStorage() {
    const almacenados = JSON.parse(localStorage.getItem("pokemones")) || [];
    const grid = document.getElementById("pokemon-grid");

    almacenados.forEach(pokemon => {
        const card = createPokemonCard(pokemon.data, pokemon.speciesData, pokemon.number, pokemon.generation);
        grid.appendChild(card);
    });
}

// EVENTOS

document.getElementById("btn-catch").addEventListener('click', () => {
    if (!currentPokemonData) return;

    const sound = document.getElementById("pokeball-sound");
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => {
            console.warn("El navegador bloqueó el sonido:", e);
        });
    }

    const grid = document.getElementById("pokemon-grid");
    const { data, speciesData } = currentPokemonData;

    const pokedexNumber = data.id.toString().padStart(3, '0');
    const generation = getGeneration(data.id);

    const card = createPokemonCard(data, speciesData, pokedexNumber, generation);
    grid.prepend(card);

    guardarPokemonEnLocalStorage({ data, speciesData, number: pokedexNumber, generation });
});

document.getElementById("btn_consultar").addEventListener("click", buscarPokemon);
document.getElementById("name").addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPokemon();
});

document.addEventListener('DOMContentLoaded', () => {
    inicializarPokedex();
    cargarPokemonesDesdeLocalStorage();
});

document.getElementById("btn_sorpresa").addEventListener("click", async () => {
    const randomId = Math.floor(Math.random() * 905) + 1;
    document.getElementById("name").value = randomId;
    await buscarPokemon();

    const nameElement = document.getElementById("pokedex-name");
    if (nameElement.textContent !== "---") {
        const alert = document.createElement('div');
        alert.textContent = `¡Profesor Oak te envió un ${nameElement.textContent}!`;
        alert.className = "alert alert-warning text-center";
        alert.style.animation = "fadeIn 0.5s ease-out";
        alert.style.fontWeight = "bold";
        alert.style.fontSize = "1.2em";
        alert.style.position = "fixed";
        alert.style.top = "20px";
        alert.style.left = "50%";
        alert.style.transform = "translateX(-50%)";
        alert.style.zIndex = "999";
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
});
=======
// Evento para atrapar
document.getElementById("btn-catch").addEventListener('click', () => {
    if (!currentPokemonData) return;
    
    const grid = document.getElementById("pokemon-grid");
    const { data, speciesData } = currentPokemonData;
    
    const pokedexNumber = data.id.toString().padStart(3, '0');
    const generation = getGeneration(data.id);
    
    const card = createPokemonCard(data, speciesData, pokedexNumber, generation);
    grid.prepend(card);
});

// Event listeners
document.getElementById("btn_consultar").addEventListener("click", buscarPokemon);
document.getElementById("name").addEventListener('keypress', (e) => {
    if(e.key === 'Enter') buscarPokemon();
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', inicializarPokedex);
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
    </style>
<<<<<<< HEAD
`);
=======
`);
>>>>>>> 6ce9b27cb881ef2382cfc1c26fecb128bfcb9994
