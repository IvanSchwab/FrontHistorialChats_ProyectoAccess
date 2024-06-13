function getUserInfo(user){
return {
    name: user.name,
    mail: user.mail,
    id: user.id,
}
}

module.exports = getUserInfo;