import capitalizeFirstLetter from "./capitalizeFirstLetter.js"

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

export default getWeakness