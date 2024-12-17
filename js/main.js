const button = document.getElementById("button");

fetchAllPokemon();

async function fetchAllPokemon() {
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    data = await pokemonResponse.json();
    const pokemonArray = data.results;
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    
    searchInput.addEventListener("input", function() {
      filterPokemon(pokemonArray, searchInput, resultsContainer)
    });
    console.log(pokemonArray);
  } catch (error) {
    console.error(error);
  }
}

function filterPokemon(pokemonArray, searchInput, resultsContainer) {

  const query = searchInput.value.toLowerCase();
  const filteredPokemon = pokemonArray.filter((pokemon) => pokemon.name.toLowerCase().startsWith(query));
  resultsContainer.innerHTML = "";
  filteredPokemon.slice(0, 10).forEach((pokemon) => {
    const pokemonElement = document.createElement("div");
    pokemonElement.id = "pokemon_list_names"
    pokemonElement.innerHTML = `${pokemon.name}`;
    resultsContainer.append(pokemonElement);
    pokemonElement.addEventListener("click", function() {
      searchInput.value = pokemonElement.innerText;
    })
  });
  if (!searchInput.value) {
    resultsContainer.innerHTML = "";
  }
}
