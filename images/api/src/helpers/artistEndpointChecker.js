/**
 * Validates an artist name.
 *
 * @param {string} name - The artist name to be validated.
 * @returns {boolean} - Returns true if the artist name is valid; otherwise, false.
 */
function checkArtistName(name) {
    if (name == null ||
        name.length <= 1 ||
        typeof name !== "string" ||
        name.length > 30) {
        return false;
    }
    return true;
}


module.exports = {
    checkArtistName
}