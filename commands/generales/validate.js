module.exports.help = {
    name : "VALIDATE",
    description : "Valide le joueur",
    example : "/validate <@user>",
    alias : [
        "VALIDER",
        "VALIDE",
        "APPROVE"
    ]
};

module.exports.run = async (client, message, args) => {
    const Fonctions = require("../../fonctions.js");                           // Load Fonctions
    const config = require('../../config/master.json');                     // Load Master Config
    const chalk = require('chalk');                                     // require chalk


    if (args[0]) {
        const user = Fonctions.getUserFromMention(client, args[0]);
        if (!user) {
            return message.reply('Veuillez mentionner une personne');
        }
        let role = Fonctions.getRole(message, config.DevMode ? config.dev.validate_role : config.normal.validate_role);
        user.addRole(role).catch(console.error);
        message.delete();
        console.log(`${chalk.blue(message.author.username)} Approved ${chalk.gray(user.user.username)}`);
        return message.channel.send(`${user}, Tu as été validé ! :white_check_mark:`);
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /validate <@user>`);
};