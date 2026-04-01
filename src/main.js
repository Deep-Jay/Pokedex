import { api,BASE_URL } from "./utils/api.js";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const dialog = document.getElementById("pokedetails");
const closeBtn = document.getElementById("closeButton");
dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});
closeBtn.addEventListener("click", () => {
  dialog.close();
});
let allPokemon = []; // store for filtering

async function loadPokemon() {
  try {
    const data = await api.get("/pokemon?limit=27");

    // data.results is an array of { name, url }
    // fetch details for each to get the image
    allPokemon = await Promise.all(
      data.results.map(async ({ name, url }) => {
        const path = new URL(url).pathname.replace("/api/v2", "");
        const detail = await api.get(path);
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
        <a class="fetch-pokemon" href="#${p.id}" data-fetch="/pokemon/${p.id}">
          <img src="${p.image}" alt="${p.name}"/>
          <h3>${p.name}</h3>
          <p>${p.types.join(", ")}</p>
        </a>
      </div>
    `,
    )
    .join("");
}

grid.addEventListener("click", async (e) => {
  const link = e.target.closest(".fetch-pokemon");
  if (!link) return;
  e.preventDefault();
  dialog.classList.add("loading");
  renderDialogContent('<div class="loader"></div>');
  dialog.showModal();
  try {
    const data = await api.get(link.dataset.fetch);
    console.table(data.abilities);
    renderDialogContent(`
            <div class="dialog-header">
              <p class="poke-id">#${data.id}</p>
              <h2>${data.species.name}</h2>
              <img class="dialog-sprite" src="${data.sprites.other.showdown.front_default}" alt="charizard">
            </div>
            <div class="dialog-body">
              <div class="type-row">
                ${data.types.map((type) => `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`).join("")}
              </div>
              <div class="stats-grid">
                <div class="stat-card"><p class="stat-label"><strong>Height</strong></p><p class="stat-value">${data.height} m</p></div>
                <div class="stat-card"><p class="stat-label"><strong>Weight</strong></p><p class="stat-value">${data.weight} kg</p></div>
              </div>
              <div class="stat-card">
                <p class="abilities-label"><strong>Abilities</strong></p>
                <div class="abilities-row">
                  ${data.abilities.map((ability) => `<span class="ability-chip">${ability.ability.name}</span>`).join("")}
                </div>
              </div>
            </div>
      `);
  } catch (err) {
    renderDialogContent(err.message);
    console.error(err.message);
  } finally {
    dialog.classList.remove("loading");
  }
});


function renderDialogContent(content) {
  document.getElementById("dialog-content").innerHTML = content;
}

// Search — filter by name using Day 3 array methods
searchInput.addEventListener("input", ({ target }) => {
  const query = target.value.toLowerCase();
  const filtered = allPokemon.filter((p) => p.name.includes(query));
  renderGrid(filtered);
});

loadPokemon();
