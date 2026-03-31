# 🔴 Pokédex

A web-based Pokédex built with Vanilla JavaScript, HTML, and CSS — powered by the [PokéAPI](https://pokeapi.co/). Search and explore your favourite Pokémon with detailed stats and info.

---

## 📸 Preview

> _Add a screenshot or GIF of your app here_

---

## ✨ Features

- 🔍 **Search & Filter** — Find Pokémon by name or type instantly
- 📄 **Pokémon Detail Page** — View stats, abilities, types, and more for each Pokémon

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure & markup |
| CSS3 | Styling & layout |
| JavaScript (ES6+) | Logic & interactivity |
| [PokéAPI](https://pokeapi.co/) | Pokémon data source |

---

## 🚀 Setup & Installation

No build tools or dependencies required — just a browser!

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pokedex.git
cd pokedex
```

### 2. Open in browser

Simply open `index.html` in your browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

> 💡 For the best experience, use a local server (e.g. VS Code's **Live Server** extension) to avoid any CORS issues with API calls.

---

## 🌐 API Reference — PokéAPI

This project uses the free, open [PokéAPI](https://pokeapi.co/). No authentication or API key required.

### Base URL

```
https://pokeapi.co/api/v2/
```

### Endpoints Used

#### Get a list of Pokémon

```
GET /pokemon?limit={limit}&offset={offset}
```

| Parameter | Type | Description |
|---|---|---|
| `limit` | `integer` | Number of results to return |
| `offset` | `integer` | Number of results to skip (for pagination) |

**Example:**
```
https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

---

#### Get a single Pokémon

```
GET /pokemon/{name or id}
```

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | The Pokémon's name (e.g. `pikachu`) |
| `id` | `integer` | The Pokémon's National Pokédex number (e.g. `25`) |

**Example:**
```
https://pokeapi.co/api/v2/pokemon/pikachu
```

**Response includes:**
- `name` — Pokémon name
- `id` — National Pokédex number
- `types` — Array of type(s)
- `stats` — Base stats (HP, Attack, Defense, etc.)
- `abilities` — List of abilities
- `sprites` — Image URLs (front, back, shiny, etc.)

---

#### Get Pokémon by type

```
GET /type/{name}
```

**Example:**
```
https://pokeapi.co/api/v2/type/fire
```

> 📖 Full API documentation: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)

---

---

<p align="center">Made with ❤️ and JavaScript · Data from <a href="https://pokeapi.co/">PokéAPI</a></p>
