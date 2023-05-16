  import getPokemonDetails from "./getPokemonDetails.js"
  import getWeakness from "./getWeakness.js"
  
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

  export default openPopup