const chalk = require('chalk');
const config = require('../config/master.json');                     // Load Master Config
const Fonctions = require("../fonctions.js");                           // Load Fonctions

module.exports = (client, oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;


    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        //console.log(`${newMember.user.username} ${chalk.green('join')} ${newUserChannel.name}`);
        if (newUserChannel.id === "682303585031290912") join(newMember);

    } else if(newUserChannel === undefined){
        //console.log(`${newMember.user.username} ${chalk.red('left')} ${oldUserChannel.name}`);
        if (oldUserChannel.id === "682303585031290912") left(newMember);

    }
    if(oldUserChannel !== undefined && newUserChannel !== undefined) {
        //console.log(`${newMember.user.username} switched ${chalk.red(oldUserChannel.name)} to ${chalk.green(newUserChannel.name)}`);
        if (oldUserChannel.id === "682303585031290912") left(newMember);
        if (newUserChannel.id === "682303585031290912") join(newMember);
    }
};
function left(member) {
    let role = Fonctions.getRole(member, config.DevMode ? config.dev.strem_role : config.normal.strem_role);
    member.removeRole(role).catch(console.error);
}
function join(member) {
    let role = Fonctions.getRole(member, config.DevMode ? config.dev.strem_role : config.normal.strem_role);
    member.addRole(role).catch(console.error);
}