


function checkUsersValid(goodUsers) {
    return function allUsersValid(submittedUsers) {

        var result = false;

        result = submittedUsers.every(function isValid(submittedUser) {
            var validity = false;
            validity = goodUsers.some(function isPresent(goodUser){
                return goodUser === submittedUser;
            });
            return validity;
        });

        return result;
    };
}

module.exports = checkUsersValid