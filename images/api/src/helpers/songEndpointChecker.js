/**
 * Validates a number.
 *
 * @param {number} number - The number to be validated.
 * @returns {boolean} - Returns true if the number is valid; otherwise, false.
 */
function checkNumber(number) {
    // Check if number is not null or undefined, is an integer, and has a valid length
    if (
        number != null &&
        Number.isInteger(number) &&
        String(number).length >= 1 &&
        String(number).length <= 20
    ) {
        return true;
    }

    return false;
}

module.exports = {
    checkNumber
};