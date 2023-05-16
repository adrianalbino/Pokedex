import getPokemonDetails from "./getPokemonDetails.js"
import {pokemonList} from "../index.js"
import openPopup from "./openPopup.js"

let count = 0
/* Display and render the pokemon */
async function displayPokemon(resetter) {
    const promises = []
    const pokemonCount = 10
    if (resetter == 0) // checks if sortByID button is clicked
    {
        count = 0
    }
    for (let x = 0; x < pokemonCount; x++) {
      promises.push(getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${count + 1}/`))
      count++
    }
    const pokemonDetailsArray = await Promise.all(promises)
  
    pokemonDetailsArray.forEach((details) => {
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
    })
  }
export default displayPokemon