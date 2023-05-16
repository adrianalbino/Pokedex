

/* Capitalize first letter of a string */
function capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());
    return capitalized;
}

export default capitalizeFirstLetter