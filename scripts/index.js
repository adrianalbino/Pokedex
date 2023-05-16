import getPokemonDetails from "./utils/getPokemonDetails.js"
import displayPokemon from "./utils/displayPokemon.js"
import openPopup from "./utils/openPopup.js"

let url = 'https://pokeapi.co/api/v2/pokemon'
let urlgetter = 'https://pokeapi.co/api/v2/pokemon'
const urlSearch = 'https://pokeapi.co/api/v2/pokemon'
const pokemonList = document.getElementById("pokemon-list")
const loadButton = document.getElementById("load-more")
const sortNameBtn = document.getElementById("sort-name")
const sortIDBtn = document.getElementById('sort-id')
const searchInput = document.getElementById("search")
let sortByID = true
let sortNameHolder = 0
let sortNameCount = 10
let ctr = 0
let pokemonDetails = []
let sortByNameArr = []



displayPokemon()
fetchPokemons()


/* Fetches all pokemon and stores them in an array */
async function fetchPokemons()
{
    sortByNameArr = []
    while (urlgetter) 
    {
        const response = await fetch(urlgetter)
        const data = await response.json()
        sortByNameArr.push(...data.results.map((pokemon) => pokemon.name))
        urlgetter = data.next
    }
    console.log(sortByNameArr)
}

/* Sort by ID button */
sortIDBtn.addEventListener("click", async function()
{
    sortByID = true
    ctr = 0
    url = 'https://pokeapi.co/api/v2/pokemon'
    pokemonList.innerHTML = ""
    displayPokemon(ctr)
})
  
/* Sort by Name */
sortNameBtn.addEventListener("click", async function()
{
    sortNameCount = 10
    sortNameHolder = 0
    sortByID = false
    pokemonList.innerHTML = ""
    loadButton.innerHTML = `
    <i class="fa fa-refresh fa-spin"></i>Load More` // adds a loading icon when not done fetching
    sortByNameArr.sort()
    for (let y = 0; y < 10; y++) {
        const details = await getPokemonDetails(
            `https://pokeapi.co/api/v2/pokemon/${sortByNameArr[y]}/`
        )
        const card = document.createElement("div")
        card.classList.add("pokemon-cards", "pokemon-card")
        const image = document.createElement("img")
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`
        card.addEventListener("click", function() 
        {
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
    loadButton.innerHTML = "Load More" // restores button to normal after fetching
})


/* Load button functionality */ 
loadButton.addEventListener("click", async function()
{
    console.log(url)
    if(sortByID == true) 
    {
        loadButton.innerHTML = `
        <i class="fa fa-refresh fa-spin"></i>Load More`
        displayPokemon()
        loadButton.innerHTML = "Load More"
    } 
    else // load more when its sorted by name
    {
        loadButton.innerHTML = `
        <i class="fa fa-refresh fa-spin"></i>Load More` // adds a loading icon when not done fetching
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
        loadButton.innerHTML = "Load More" // restores button to normal after fetching
    }
}
)

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
              const details = await getPokemonDetails(`${urlSearch}/${pokemonId}`)
              pokemonList.innerHTML += `
              <div class="pokemon-cards pokemon-card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" <br> 
                <p class="id">ID: ${pokemonId}</p>
                <p class="name"> Name: ${details.name}</p>
                <p class="type"> Types: ${details.types} </p>
              </div>`
              // Get the newly added div element
              const div = pokemonList.lastElementChild
              div.addEventListener("click", function() {
                openPopup(details.id)
              })
              matchesFound = true
            } catch (error) {
                pokemonList.innerHTML = `<p class="error">No results found.</p>`
            }
          }
    } else // if searchvalue is a name
    {
        let searchName = searchValue.toLowerCase()
        url = 'https://pokeapi.co/api/v2/pokemon'
        for (let idCheck = 0; idCheck < sortByNameArr.length && matchesFound == false; idCheck++) // nested loop to go through entire api
        {
            if (sortByNameArr[idCheck].toLowerCase().includes(searchName))
                {
                    const details = await getPokemonDetails(`${urlSearch}/${sortByNameArr[idCheck]}`)
                    pokemonList.innerHTML += `
                    <div class="pokemon-cards pokemon-card">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png" <br> 
                        <p class="id">ID: ${details.id}</p>
                        <p class="name"> Name: ${details.name}</p>
                        <p class="type"> Types: ${details.types} </p>
                    </div>`
                    const div = pokemonList.lastElementChild
                    div.addEventListener("click", function() {
                      openPopup(details.id)
                    })
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
            const div = document.createElement("div")
            div.classList.add("pokemon-cards", "pokemon-card")
            div.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x + 1}.png" <br> 
                <p class="id">ID: ${data.id}</p>
                <p class="name"> Name: ${data.name}</p>
                <p class="type"> Types: ${data.types} </p>
                `
            div.addEventListener("click", function() {
              openPopup(data.id)
            })
            pokemonList.appendChild(div)         
        }
    }

})

export {pokemonDetails, pokemonList}

