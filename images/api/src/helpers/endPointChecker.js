/**
 * Validates a username.
 *
 * @param {string} name - The username to be validated.
 * @returns {boolean} - Returns true if the username is valid; otherwise, false.
 */
function checkUserName(name) {
    if (name == null ||
        name.length <= 1 ||
        typeof name !== "string" ||
        name.length > 20) {
        return false;
    }
    return true;
}


/**
 * Validates a password.
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} - Returns true if the password is valid; otherwise, false.
 */
function checkPassword(password) {
    const commonWords = ["password", "123456", "qwerty"];
    if (password == null ||
        password.length <= 5 ||
        typeof password !== "string" ||
        password.length > 20) {
        return false;
    }
    if (commonWords.includes(password.toLowerCase())) {
        return false;
    }
    return true;
}

module.exports = {
    checkUserName,
    checkPassword
}