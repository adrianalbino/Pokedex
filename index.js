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
const urlSearch = 'https://pokeapi.co/api/v2/pokemon'


/* Fetch names and store in array */
let pokemons = []

async function getPokemonData(api) 
{
    pokemons = [] // clear out the array 
    const response = await fetch(api)
    const data = await response.json()
    url = data.next
    pokemons = data.results.map(element => element.name)
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
        "height" : height,
        "id" : data.id
    }
    return details
}
/* Display and render the pokemon */
async function displayPokemon()
{
    await getPokemonData(url)
    for (let x = 0; x < 10; x++) // limit to 10 
    {
        const details = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${count + 1}/`)
        count++
        pokemonList.innerHTML += `
        <div class="pokemon-cards pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png" <br> 
            <p class="id">ID: ${details.id}</p>
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
startPokemons = pokemons



/* Capitalize first letter of a string */
function capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());
    return capitalized;
}


/* Adding search functionality */
searchInput.addEventListener("input", async function()
{   
    console.log(searchInput.value)
    const searchValue = searchInput.value.trim()
    pokemonList.innerHTML = ""
    let matchesFound = false // determine if match is found
    if (!isNaN(searchValue)) // checks if value is a number
    {  
        // console.log(searchValue)
        const pokemonId = parseInt(searchValue)
        if (pokemonId >= 1 && pokemonId <= 1010) // 1010 amount of pokemons in API
        {
            const details = await getPokemonDetails(`${urlSearch}/${pokemonId}`)
            pokemonList.innerHTML += `
            <div class="pokemon-cards pokemon-card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" <br> 
                <p class="id">ID: ${pokemonId}</p>
                <p class="name"> Name: ${details.name}</p>
                <p class="type"> Types: ${details.types} </p>
            </div>`
            matchesFound = true
        }
    } else // if searchvalue is a name
    {
        let searchName = searchValue.toLowerCase()
        let idStore
        url = 'https://pokeapi.co/api/v2/pokemon'
        pokemons = []
        for (let idCheck = 0; idCheck <= 1010 && matchesFound == false; idCheck += 20) // nested loop to go through entire api
        {
            await getPokemonData(url)
            for (x = 0; x < 20; x++)
            {
                if (pokemons[x].toLowerCase().includes(searchName))
                {
                    if (idCheck >= 20)
                    {
                        idStore = idCheck + x
                    } 
                    else {
                        idStore = x
                    }
                    const details = await getPokemonDetails(`${urlSearch}/${idStore+1}`)
                    pokemonList.innerHTML += `
                    <div class="pokemon-cards pokemon-card">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png" <br> 
                        <p class="id">ID: ${details.id}</p>
                        <p class="name"> Name: ${details.name}</p>
                        <p class="type"> Types: ${details.types} </p>
                    </div>`
                    matchesFound = true
                }
            }
        }
    } if (!matchesFound && searchInput.value != "")
    {
        console.log(searchInput.value)
        pokemonList.innerHTML = `<p class="error">No results found.</p>`
    }
    if(searchInput.value != "") // hides or shows load button when searching
    {
        loadButton.style.display = "none"
    } else 
    {
        loadButton.style.display = "block"
        for (let x = 0; x < 10; x++) // renders the first 10 pokemon when search bar is cleared
        {
            const data = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${x + 1}/`)
            pokemonList.innerHTML += `
            <div class="pokemon-cards pokemon-card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x + 1}.png" <br> 
                <p class="id">ID: ${data.id}</p>
                <p class="name"> Name: ${data.name}</p>
                <p class="type"> Types: ${data.types} </p>
            </div>`
        }
    }

})