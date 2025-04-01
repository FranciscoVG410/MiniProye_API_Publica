let currentPokemonData = null;

function inicializarPokedex() {
    document.getElementById("pokedex-sprite").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    document.getElementById("pokedex-name").textContent = "---";
    document.getElementById("pokedex-number").textContent = "---";
    document.getElementById("pokedex-generation").textContent = "---";
    document.getElementById("btn-catch").disabled = true;
}

async function buscarPokemon() {
    const name = document.getElementById("name").value.toLowerCase();

    try {
        const currentPokemonElement = document.getElementById("current-pokemon");
        const nameElement = document.getElementById("pokedex-name");

        currentPokemonElement.style.animation = 'none';
        nameElement.style.animation = 'none';
        void currentPokemonElement.offsetHeight;
        void nameElement.offsetHeight;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        currentPokemonData = { data, speciesData };

        const pokedexNumber = data.id.toString().padStart(3, '0');
        const generation = getGeneration(data.id);

        document.getElementById("pokedex-sprite").src = data.sprites.other['official-artwork'].front_default;
        nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById("pokedex-number").textContent = pokedexNumber;
        document.getElementById("pokedex-generation").textContent = generation;

        currentPokemonElement.style.animation = 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        nameElement.style.animation = 'namePopIn 0.8s ease-out forwards';

        document.getElementById("btn-catch").disabled = false;
    } catch (error) {
        currentPokemonData = null;
        inicializarPokedex();
        showError(error.message);
    }
}

function createPokemonCard(data, speciesData, number, generation) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    // Obtener los tipos del Pokémon
    const types = data.types.map(t => 
        `<span class="pokemon-type type-${t.type.name}">${t.type.name}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="pokemon-img-container">
            <img class="pokemon-img" src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-details">
            <h3 class="pokemon-name">${data.name}</h3>
            <p class="pokemon-number">N.º ${number}</p>
            <div class="pokemon-types">${types}</div>
            <div class="pokemon-stats">
                <div class="pokemon-stat"><span>Altura:</span> ${data.height / 10}m</div>
                <div class="pokemon-stat"><span>Peso:</span> ${data.weight / 10}kg</div>
                <div class="pokemon-stat"><span>Generación:</span> ${generation}</div>
                <div class="pokemon-stat"><span>Experiencia:</span> ${data.base_experience || '?'}</div>
            </div>
            <button class="release-btn">Liberar</button>
        </div>
    `;

    card.querySelector('.release-btn').addEventListener('click', () => {
        card.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            card.remove();
            eliminarDeLocalStorage(data.id);
        }, 500);
    });

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
        alert.className = "alert alert-warning text-center alert-custom"; // Usa la misma clase para todas las alertas
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
});

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
    </style>
`);
function scalePokedexElements() {
    const pokedexContainer = document.querySelector('.pokedex-container');
    const scale = pokedexContainer.offsetWidth / 1223; // 1223 = ancho original
    
    // Elementos a escalar
    const elementsToScale = document.querySelectorAll('.pokedex-display, .search-section');
    
    elementsToScale.forEach(element => {
        element.style.transform = `scale(${scale})`;
    });
}

// Ejecutar al cargar y al cambiar tamaño
window.addEventListener('load', scalePokedexElements);
window.addEventListener('resize', scalePokedexElements);