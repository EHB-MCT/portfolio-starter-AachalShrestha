/**
 * Validates an artist name.
 *
 * @param {string} name - The username to be validated.
 * @returns {boolean} - Returns true if the username is valid; otherwise, false.
 */
function checkArtistName(name) {
    if (name == null ||
        name.length <= 1 ||
        typeof name !== "string" ||
        name.length > 20) {
        return false;
    }
    return true;
}


module.exports = {
    checkArtistName
}