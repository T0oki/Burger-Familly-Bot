const config = require('../config/master.json');
const Fonctions = require("../fonctions.js");                      // Load Fonctions

module.exports = (client, member) => {
    if (member.user.bot) return;
    let role = Fonctions.getRole(member, Fonctions.DevOrNot(["roles","welcome"]));
    member.addRole(role).catch(console.error);

};