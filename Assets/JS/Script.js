const listPokemon = document.querySelector("#listPokemon .row");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())        
}

function showPokemon(data) {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card bg-custom position-relative rounded-3" style="width: 18rem;">
            <p class="pokemon-id-back-bs">#${data.id.toString().padStart(3, '0')}</p>
            <div class="pokemon-imagen-bs d-flex justify-content-center align-items-center">
                <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="img-fluid" style="max-width: 6rem;">
            </div>
            <div class="card-body text-center p-0">
                <h2 class="card-title text-uppercase">${data.name}</h2>
                <div class="d-flex justify-content-center gap-1">
                    ${data.types.map(type => {                        
                        const translatedType = typeTranslations[type.type.name];
                        return `<p class="type-tag type__${type.type.name}">${translatedType}</p>`;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    listPokemon.appendChild(card);
}

const checkboxes = document.querySelectorAll("#listType input[type='checkbox']");

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterPokemon);
});

function filterPokemon() {   
    listPokemon.innerHTML = "";
        
    const selectedTypes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toUpperCase());
   

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const types = data.types.map(type => type.type.name.toUpperCase());

                if (selectedTypes.includes("VER TODOS") || types.some(type => selectedTypes.includes(type))) {
                    showPokemon(data);
                }
            });
    }
}

const typeTranslations = {
    normal: "NORMAL",
    fire: "FUEGO",
    water: "AGUA",
    electric: "ELÉCTRICO",
    grass: "PLANTA",
    ice: "HIELO",
    fighting: "LUCHA",
    poison: "VENENO",
    ground: "TIERRA",
    flying: "VOLADOR",
    psychic: "PSÍQUICO",
    bug: "BICHO",
    rock: "ROCA",
    ghost: "FANTASMA",
    dragon: "DRAGÓN",
    dark: "SINIESTRO",
    steel: "ACERO",
    fairy: "HADA"
};
