import capitalizeFirstLetter from "./capitalizeFirstLetter.js"
import {pokemonDetails} from "../index.js"

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

export default getPokemonDetails