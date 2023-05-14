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
let pokemonDetails = []


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
    let arrayTypes = []
    let numberOfTypes
    const response = await fetch(api)
    const data = await response.json()
    for (numberOfTypes = 0; numberOfTypes < data.types.length; numberOfTypes++){
        arrayTypes = arrayTypes.concat(data.types[numberOfTypes].type.name)
    }
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
        "arrTypes": arrayTypes,
        "height" : height,
        "id" : data.id
    }
    pokemonDetails.push(details)
    return details
}
/* Display and render the pokemon */
async function displayPokemon() {
    await getPokemonData(url);
    for (let x = 0; x < 10; x++) {
      const details = await getPokemonDetails(
        `https://pokeapi.co/api/v2/pokemon/${count + 1}/`
      )
      count++;
      const card = document.createElement("div");
      card.classList.add("pokemon-cards", "pokemon-card");
  
      const image = document.createElement("img");
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`;
      card.addEventListener("click", function() {
        openPopup(details.id);
      });
  
      const id = document.createElement("p");
      id.classList.add("id");
      id.textContent = `ID: ${details.id}`;
  
      const name = document.createElement("p");
      name.classList.add("name");
      name.textContent = `Name: ${details.name}`;
  
      const type = document.createElement("p");
      type.classList.add("type");
      type.textContent = `Types: ${details.types}`;
  
      card.appendChild(image);
      card.appendChild(id);
      card.appendChild(name);
      card.appendChild(type);
  
      pokemonList.appendChild(card);
    }
  }
  
  async function openPopup(pokemonID) {
    /* Remove existing popups */
    const existingPopups = document.querySelectorAll(".popup");
    existingPopups.forEach((popup) => popup.remove());
    /* Popup creation */
    const details = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const listofWeaknesses = await getWeakness(details.arrTypes)
    // console.log(listofWeaknesses)
    const popup = document.createElement("div")
    popup.classList.add("popup")
    const image = document.createElement("img")
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`
    const id = document.createElement("p")
    id.textContent = `ID: ${details.id}`
    const name = document.createElement("p")
    name.textContent = `Name: ${details.name}`
    const type = document.createElement("p")
    type.textContent = `Types: ${details.types}`
    const height = document.createElement("p")
    height.textContent = `Height: ${details.height}`
    const weakness = document.createElement("p")
    weakness.textContent = `Weaknesses: ${listofWeaknesses}`
    /* Adding to div */
    popup.appendChild(image)
    popup.appendChild(id)
    popup.appendChild(name)
    popup.appendChild(type)
    popup.appendChild(height)
    popup.appendChild(weakness)
  
    document.body.appendChild(popup);
    popup.addEventListener("click", () => { // closes popup when clicking on it
        document.body.removeChild(popup);
      });
  }
  
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
searchInput.addEventListener("input", async function()
{   
    // console.log(searchInput.value)
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
            <div class="pokemon-cards pokemon-card" onclick="openPopup(${pokemonId})">
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
                    <div class="pokemon-cards pokemon-card" onclick="openPopup(${details.id})">
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
        // console.log(searchInput.value)
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
            <div class="pokemon-cards pokemon-card" onclick="openPopup(${x + 1})">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x + 1}.png" <br> 
                <p class="id">ID: ${data.id}</p>
                <p class="name"> Name: ${data.name}</p>
                <p class="type"> Types: ${data.types} </p>
            </div>`
        }
    }

})

/* Get weakness */
async function getWeakness(types)
{
    let weaknesses = []
    let weakString = ""
    for (let ctr = 0; ctr < types.length; ctr++) 
    {
        switch (types[ctr])
        {
            case "normal":
                weaknesses = weaknesses.concat(["fighting"])
                break
            case "fighting":
                weaknesses = weaknesses.concat(["flying", "psychic", "fairy"])
                break
            case "flying":
                weaknesses = weaknesses.concat(["rock", "electric", "ice"])
                break
            case "poison":
                weaknesses = weaknesses.concat(["ground", "psychic"])
                break
            case "ground":
                weaknesses = weaknesses.concat(["water", "grass", "ice"])
                break
            case "rock":
                weaknesses = weaknesses.concat(["fighting", "ground", "steel", "water", "grass"])
            case "bug":
                weaknesses = weaknesses.concat(["flying", "rock", "fire"])
                break
            case "ghost":
                weaknesses = weaknesses.concat(["ghost", "dark"])
                break
            case "steel":
                weaknesses = weaknesses.concat(["fighting", "ground", "fire"])
                break
            case "fire":
                weaknesses = weaknesses.concat(["ground", "rock", "water"])
                break
            case "water":
                weaknesses = weaknesses.concat(["grass", "electric"])
                break
            case "grass":
                weaknesses = weaknesses.concat(["flying", "poison", "bug", "fire", "ice"])
                break
            case "electric":
                weaknesses = weaknesses.concat(["ground"])
                break
            case "psychic":
                weaknesses = weaknesses.concat(["bug", "ghost", "dark"])
                break
            case "ice":
                weaknesses = weaknesses.concat(["fighting", "rock", "steel", "fire"])
                break
            case "dragon":
                weaknesses = weaknesses.concat(["ice", "dragon", "fairy"])
                break
            case "fairy":
                weaknesses = weaknesses.concat(["poison", "steel"])
                break
            case "dark":
                weaknesses = weaknesses.concat(["fighting", "bug", "fairy"])
                break
        }
    }
    for (let ctr2 = 0; ctr2 < weaknesses.length; ctr2++) // converts the array to a string
    {
        weakString += capitalizeFirstLetter(weaknesses[ctr2]) + " "
    }
    return weakString
}