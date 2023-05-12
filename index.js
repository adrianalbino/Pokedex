/*
1. Have an array that stores all the data of the pokemon from 1 - 20
2. Store their name, url just changes according to id
3. Fetch data from with array key as the ID, get types, name, height,type, category, stats
4. Capitalize the first letter of each
5. Append to the innerHTML
*/

let url = 'https://pokeapi.co/api/v2/pokemon'
const pokemonList = document.getElementById("pokemon-list")
const loadButton = document.getElementById("load-more")
const searchInput = document.getElementById("search")
let count = 0
let urlNext


/* Fetch names and store in array */
let pokemons = []

async function getPokemonData(api) 
{
    pokemons = [] // clear out the array 
    const response = await fetch(api)
    const data = await response.json()
    url = data.next
    console.log(url)
    pokemons = data.results.map(element => element.name)
    console.log(pokemons)
}

/* Make an object to store its important details */
async function getPokemonDetails(api)
{  
    let type2
    const response = await fetch(api)
    const data = await response.json()
    if(data.types[1]){
        type2 = capitalizeFirstLetter(data.types[1].type.name)
    } else {
        type2 = ""
    }
    let name = capitalizeFirstLetter(data.forms[0].name)
    let types = capitalizeFirstLetter(data.types[0].type.name) + " " + type2
    let height = data.height
    const details = {
        "name" : name,
        "types" : types,
        "height" : height
    }
    return details
}
/* Display and render the pokemon */
async function displayPokemon()
{
    await getPokemonData(url)
    for (let x = 0; x < 10; x++) // limit to 10 until
    {
        console.log("hi")
        const details = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${count + 1}/`)
        count++
        console.log(details)
        let ID = count
        pokemonList.innerHTML += `
        <div class="pokemon-cards pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png" <br> 
            <p class="id">ID: ${ID}</p>
            <p class="name"> Name: ${details.name}</p>
            <p class="type"> Types: ${details.types} </p>
        </div>`
    }
}

// Height: ${details.height} <br>
/* Load button */
loadButton.addEventListener("click", function()
{
    displayPokemon()
})

displayPokemon()



/* Capitalize first letter of a string */
function capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());
    return capitalized;
}




/* Adding search functionality */
searchInput.addEventListener("input", function()
{

})