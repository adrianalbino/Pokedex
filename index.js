/*
1. Have an array that stores all the data of the pokemon from 1 - 20
2. Store their name, url just changes according to id
3. Fetch data from with array key as the ID, get types, name, height,type, category, stats
4. Capitalize the first letter of each
5. Append to the innerHTML
*/

let url = 'https://pokeapi.co/api/v2/pokemon'
let urlgetter = 'https://pokeapi.co/api/v2/pokemon'
const urlSearch = 'https://pokeapi.co/api/v2/pokemon'
const pokemonList = document.getElementById("pokemon-list")
const loadButton = document.getElementById("load-more")
const sortNameBtn = document.getElementById("sort-name")
const sortIDBtn = document.getElementById('sort-id')
const searchInput = document.getElementById("search")
let count = 0
let sortNameHolder = 0
let sortNameCount = 10
let sortByID = true
let pokemonDetails = []
let pokemonMasterArr = []
let sortByNameArr = []


/* Fetch names and store in array */
let pokemons = []

async function getPokemonData(api) 
{
    pokemons = [] // clear out the array 
    const response = await fetch(api)
    const data = await response.json()
    url = data.next
    pokemons = data.results.map(element => element.name)
    pokemonMasterArr = pokemonMasterArr.concat(pokemons)
    console.log(pokemonMasterArr)
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
    console.log(url)
    await getPokemonData(url)
    for (let x = 0; x < 10; x++) {
      const details = await getPokemonDetails(
        `https://pokeapi.co/api/v2/pokemon/${count + 1}/`
      )
      count++
      const card = document.createElement("div")
      card.classList.add("pokemon-cards", "pokemon-card")
  
      const image = document.createElement("img")
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`
      card.addEventListener("click", function() {
        openPopup(details.id)
      })
  
      const id = document.createElement("p")
      id.classList.add("id")
      id.textContent = `ID: ${details.id}`
  
      const name = document.createElement("p")
      name.classList.add("name")
      name.textContent = `Name: ${details.name}`
  
      const type = document.createElement("p")
      type.classList.add("type")
      type.textContent = `Types: ${details.types}`
  
      card.appendChild(image)
      card.appendChild(id)
      card.appendChild(name)
      card.appendChild(type)
  
      pokemonList.appendChild(card)
    }
  }

  /* Sort by ID button */
  sortIDBtn.addEventListener("click", async function()
  {
    pokemonMasterArr = []
    pokemons = []
    sortByID = true
    count = 0
    url = 'https://pokeapi.co/api/v2/pokemon'
    pokemonList.innerHTML = ""
    displayPokemon()
  })

  /* Fetches all pokemon and stores them in an array */
  async function fetchPokemons()
  {
    sortByNameArr = []
    while (urlgetter) {
        const response = await fetch(urlgetter);
        const data = await response.json();
        sortByNameArr.push(...data.results.map((pokemon) => pokemon.name));
        urlgetter = data.next;
      }
      console.log(sortByNameArr)
  }

/* Sort by Name */
  sortNameBtn.addEventListener("click", async function()
  {
    sortNameCount = 10
    sortNameHolder = 0
    sortByID = false
    pokemonList.innerHTML = ""
    sortByNameArr.sort()
    for (let y = 0; y < 10; y++) {
        const details = await getPokemonDetails(
          `https://pokeapi.co/api/v2/pokemon/${sortByNameArr[y]}/`
        )
        const card = document.createElement("div")
        card.classList.add("pokemon-cards", "pokemon-card")
        const image = document.createElement("img")
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`
        card.addEventListener("click", function() {
          openPopup(details.id);
        });
    
        const id = document.createElement("p")
        id.classList.add("id")
        id.textContent = `ID: ${details.id}`
    
        const name = document.createElement("p")
        name.classList.add("name")
        name.textContent = `Name: ${details.name}`
    
        const type = document.createElement("p")
        type.classList.add("type")
        type.textContent = `Types: ${details.types}`
    
        card.appendChild(image)
        card.appendChild(id)
        card.appendChild(name)
        card.appendChild(type)
    
        pokemonList.appendChild(card)
      }
})



  /* Click to popup */
  async function openPopup(pokemonID) {
    /* Remove existing popups */
    const existingPopups = document.querySelectorAll(".popup");
    existingPopups.forEach((popup) => popup.remove());
    /* Popup creation */
    // console.log(pokemonID)
    const details = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const listofWeaknesses = await getWeakness(details.arrTypes)
    // console.log(listofWeaknesses)
    const popup = document.createElement("div")
    popup.classList.add("popup")
    const image = document.createElement("img")
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`
    image.style.display = "block"
    image.style.margin = "0 auto"
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

    /* Adding previous, next and close buttons*/
    const previousBtn = document.createElement("button")
    previousBtn.innerHTML = "Previous"
    previousBtn.classList.add("popup-btn")
    previousBtn.addEventListener("click", function(){
        if (details.id - 1 > 0) 
        {
            openPopup(details.id - 1)
        }
    })

    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = "Next"
    nextBtn.classList.add("popup-btn")
    nextBtn.addEventListener("click",function(){
        if (details.id + 1 < 11000) 
        {
            console.log(details.id + 1)
            openPopup(details.id + 1)
        }
    })

    const closeBtn = document.createElement("button")
    closeBtn.innerHTML = "Close"
    closeBtn.classList.add("popup-btn")
    closeBtn.addEventListener("click", function()
    {
        document.body.removeChild(popup)
    })

    const container = document.createElement("div")
    container.classList.add("contain-button")
    container.appendChild(previousBtn)
    container.appendChild(nextBtn)
    container.appendChild(closeBtn)
    /* Adding to div */
    popup.appendChild(image)
    popup.appendChild(id)
    popup.appendChild(name)
    popup.appendChild(type)
    popup.appendChild(height)
    popup.appendChild(weakness)
    popup.appendChild(container)
  
    document.body.appendChild(popup)
  }
  
loadButton.addEventListener("click", async function()
{
    console.log(url)
    if(sortByID == true) 
    {
        displayPokemon()
    } 
    else // load more when its sorted by name
    {
        sortNameHolder = sortNameCount + 10
        for (; sortNameCount < sortNameHolder; sortNameCount++)
        {
              console.log(sortNameCount)
              const details = await getPokemonDetails(
                `https://pokeapi.co/api/v2/pokemon/${sortByNameArr[sortNameCount]}/`
              )
              const card = document.createElement("div")
              card.classList.add("pokemon-cards", "pokemon-card")
              const image = document.createElement("img")
              image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`
              card.addEventListener("click", function() {
                openPopup(details.id);
              });
          
              const id = document.createElement("p")
              id.classList.add("id")
              id.textContent = `ID: ${details.id}`
          
              const name = document.createElement("p")
              name.classList.add("name")
              name.textContent = `Name: ${details.name}`
          
              const type = document.createElement("p")
              type.classList.add("type")
              type.textContent = `Types: ${details.types}`
          
              card.appendChild(image)
              card.appendChild(id)
              card.appendChild(name)
              card.appendChild(type)
          
              pokemonList.appendChild(card)
        }
    }
}
)

displayPokemon()
fetchPokemons()


/* Capitalize first letter of a string */
function capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());
    return capitalized;
}




/* Adding search functionality */
searchInput.addEventListener("input", async function()
{   
    const searchValue = searchInput.value.trim()
    pokemonList.innerHTML = ""
    let matchesFound = false // determine if match is found
    if (!isNaN(searchValue)) // checks if value is a number
    {  
        const pokemonId = parseInt(searchValue)
        if (pokemonId >= 1 && pokemonId <= 11000) {
            try {
              const details = await getPokemonDetails(`${urlSearch}/${pokemonId}`);
              pokemonList.innerHTML += `
              <div class="pokemon-cards pokemon-card" onclick="openPopup(${pokemonId})">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" <br> 
                <p class="id">ID: ${pokemonId}</p>
                <p class="name"> Name: ${details.name}</p>
                <p class="type"> Types: ${details.types} </p>
              </div>`;
              matchesFound = true;
            } catch (error) {
                pokemonList.innerHTML = `<p class="error">No results found.</p>`
            }
          }
    } else // if searchvalue is a name
    {
        let searchName = searchValue.toLowerCase()
        let idStore
        url = 'https://pokeapi.co/api/v2/pokemon'
        pokemons = []
        for (let idCheck = 0; idCheck <= sortByNameArr.length && matchesFound == false; idCheck++) // nested loop to go through entire api
        {
            if (sortByNameArr[idCheck].toLowerCase().includes(searchName))
                {
                    const details = await getPokemonDetails(`${urlSearch}/${sortByNameArr[idCheck]}`)
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
    if (!matchesFound && searchInput.value != "")
    {
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