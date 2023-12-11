/**
 * Validates a number.
 *
 * @param {number} number - The number to be validated.
 * @returns {boolean} - Returns true if the number is valid; otherwise, false.
 */
function checkNumber(number) {
    if (
        number != null &&
        typeof number === 'number' &&
        isFinite(number) &&
        String(number).trim() !== ''
    ) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    checkNumber
};