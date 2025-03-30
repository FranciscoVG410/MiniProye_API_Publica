async function pokemon() {
    const name = document.getElementById("name").value.toLowerCase();
    const infoDiv = document.getElementById("info");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("como vales madre la nt");

        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        infoDiv.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Color:</strong> ${speciesData.color.name}</p>
        `;
    } catch (error) {
        infoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

document.getElementById("btn_consultar").addEventListener("click", pokemon);