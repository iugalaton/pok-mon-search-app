const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonCard = document.getElementById("pokemon-card");
const pokemonStats = document.getElementById("pokemon-stats");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("image");
const type = document.getElementById("types");
const hp = document.getElementById("hp");



const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// get all pokemons 
const getPokemonsList = async () => {
    try {
        const response = await fetch(pokemonListUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const pokemonList = await response.json();
        showPokemon(pokemonList);
    } catch (error) {
        console.error(error.message);
    }
}

const getPokemonstats = async (searchedPokemonUrl) => {
    try {
        const response = await fetch(searchedPokemonUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const pokemonStats = await response.json();
        showPokemonStats(pokemonStats);
        console.log("Stats ", pokemonStats)
    } catch (error) {
        console.error(error.message);
    }
}

const showPokemon = (pokemonList) => {
   
    //find pokemon by id or name 
    const searchedPokemon = pokemonList.results.find(element => element.name == input.value.toLowerCase() || element.id == input.value);
    if (searchedPokemon == undefined) {
        return alert("Pokémon not found");
    }
    const { id, name, url } = searchedPokemon;
    let searchedPokemonUrl = url;
    pokemonName.innerText = name.toUpperCase();
    pokemonId.innerText = "#" + id;
    console.log("Pokemon name ", searchedPokemon.name)
    // get the data of pokemon by another fetch   
    getPokemonstats(searchedPokemonUrl);
}

const showPokemonStats = (getPokemonstats) => {
    type.innerHTML = "";
    const { height, weight, stats, types, sprites } = getPokemonstats;

    const pokemonStats = stats.map(stat => {
        return {
            name: stat.stat.name,
            value: stat.base_stat
        }
    });
    console.log("stats: ", pokemonStats);
    pokemonStats.forEach(element => {

        return document.getElementById(element.name).innerText = element.value
    })
    
    const pokemonType = types.map(element => {
        type.innerHTML += `<div id="type">${element.type.name.toUpperCase()}</div>`
    });
    pokemonHeight.innerText = "Height: " + height;
    pokemonWeight.innerText = "Weight: " + weight;
    console.log("image url ", sprites.front_default);
    pokemonImage.innerHTML = `<img id= "sprite" src="${sprites.front_default}" alt="front-default">`;


}

// when I search by id or name I should get the searched pokemon
searchBtn.addEventListener("click", () => {
    if (input.value == "") {
        return alert("Please give the name or the id of the pokemon you search");
    } else
        getPokemonsList();
});