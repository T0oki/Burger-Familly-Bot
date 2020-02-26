const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "UNVALIDATE",
    description : "dé-valide le joueur",
    example : "/unvalidate <@user>",
    alias : [
        "DEVALIDER",
        "UNVALIDE",
        "DELVALIDE"
    ]
};

module.exports.run = async (client, message, args) => {

    // Permission Check
    if(!Fonctions.hasRole(message.member, [
        "directeur",
        "responsable",
        "admin",
        "modo",
        "modo-test"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    if (args[0]) {
        const user = Fonctions.getUserFromMention(client, args[0]);
        if (!user) {
            return message.reply('Veuillez mentionner une personne');
        }
        let role = Fonctions.getRole(message, config.DevMode ? config.dev.validate_role : config.normal.validate_role);
        user.removeRole(role).catch(console.error);
        message.delete();
        console.log(`${chalk.blue(message.author.username)} UnApproved ${chalk.red(user.user.username)}`);
        return message.channel.send(`${user}, Tu n'es plus validé ! :x:`);
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /validate <@user>`);
};