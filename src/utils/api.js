export const BASE_URL = "https://pokeapi.co/api/v2";

async function request(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  get: (url) => request(url),
};
