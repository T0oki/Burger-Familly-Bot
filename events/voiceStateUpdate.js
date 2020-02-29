const chalk = require('chalk');
const config = require('../config/master.json');                     // Load Master Config
const Fonctions = require("../fonctions.js");                           // Load Fonctions

module.exports = (client, oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    let streamChanID = Fonctions.DevOrNot(["steam_channel"]);

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        //console.log(`${newMember.user.username} ${chalk.green('join')} ${newUserChannel.name}`);
        if (newUserChannel.id === streamChanID) join(newMember);

    } else if(newUserChannel === undefined){
        //console.log(`${newMember.user.username} ${chalk.red('left')} ${oldUserChannel.name}`);
        if (oldUserChannel.id === streamChanID) left(newMember);

    }
    if(oldUserChannel !== undefined && newUserChannel !== undefined) {
        //console.log(`${newMember.user.username} switched ${chalk.red(oldUserChannel.name)} to ${chalk.green(newUserChannel.name)}`);
        if (oldUserChannel !== newUserChannel) {
            if (oldUserChannel.id === streamChanID) left(newMember);
            if (newUserChannel.id === streamChanID) join(newMember);
        }
    }
};
function left(member) {
    let role = Fonctions.getRole(member, Fonctions.DevOrNot(["roles","stream"]));
    member.removeRole(role).catch(console.error);
}
function join(member) {
    let role = Fonctions.getRole(member, Fonctions.DevOrNot(["roles","stream"]));
    member.addRole(role).catch(console.error);
}