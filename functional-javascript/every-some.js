function checkUsersValid(goodUsers) {
    var allUsersValid = function (submittedUsers) {
        var result = false;
        result = submittedUsers.every(function isValid(submittedUser) {
            var validity = false;
            validity = goodUsers.some( function isPresent(goodUser){
                return goodUser.id === submittedUser.id;
            });
            return validity;
        });
        return result;
    };
    return allUsersValid;
}

module.exports = checkUsersValid