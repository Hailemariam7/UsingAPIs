const VALID_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
const INVALID_URL = 'https://pokeapi.co/api/v2/pokemons/?limit=5';

async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw `HTTP ERROR ${response.status}`;
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

function renderResults(pokemons) {
  const errorElement = document.querySelector("#error");
  errorElement.innerText = "";

  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = JSON.stringify(pokemons.results, null, 2);
}

function renderError(err) {
  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = '';

  const errorElement = document.querySelector('#error');
  errorElement.innerText = err.message;
}

async function main() {
  const button = document.querySelector('#button');
  button.addEventListener('click', initiateFetch);

  async function initiateFetch() {
    const option = document.querySelector('#option');
    const url = option.checked ? INVALID_URL : VALID_URL;

    try {
      const pokemons = await fetchJSON(url);
      renderResults(pokemons);
    } catch (error) {
      renderError(error);
    }
  }
}

window.addEventListener('load', main);