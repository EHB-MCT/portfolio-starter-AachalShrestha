/**
 * Register a new user.
 *
 * @params : username
 * @returns : false if no match, true if right type
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


module.exports = {
    checkUserName
}