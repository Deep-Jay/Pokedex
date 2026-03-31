import { api } from "./utils/api.js";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const BASE_URL = "https://pokeapi.co/api/v2";

let allPokemon = []; // store for filtering

async function loadPokemon() {
  try {
    const data = await api.get("/pokemon?limit=27");

    // data.results is an array of { name, url }
    // fetch details for each to get the image
    allPokemon = await Promise.all(
      data.results.map(async ({ name, url }) => {
        const detail = await api.get(url.replace(BASE_URL, ""));
        return {
          name,
          id: detail.id,
          image: detail.sprites.front_default,
          types: detail.types.map((t) => t.type.name),
        };
      }),
    );

    renderGrid(allPokemon);
  } catch (err) {
    grid.innerHTML = `<p>Failed to load: ${err.message}</p>`;
  }
}

function renderGrid(pokemon) {
  grid.innerHTML = pokemon
    .map(
      (p) => `
      <div class="card" data-name="${p.name}">
        <img src="${p.image}" alt="${p.name}"/>
        <h3>${p.name}</h3>
        <p>${p.types.join(", ")}</p>
      </div>
    `,
    )
    .join("");
}

// Search — filter by name using Day 3 array methods
searchInput.addEventListener("input", ({ target }) => {
  const query = target.value.toLowerCase();
  const filtered = allPokemon.filter((p) => p.name.includes(query));
  renderGrid(filtered);
});

loadPokemon();
