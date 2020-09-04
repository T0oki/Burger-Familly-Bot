const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "VALIDATE",
    description : "Valide le joueur",
    example : "/validate <@user>",
    alias : [
        "VALIDER",
        "VALIDE",
        "APPROVE"
    ],
    display : true
};

module.exports.run = async (client, message, args) => {
    // Permission Check
    if(!Fonctions.hasRole(message.member, [
    "developer",
    "directeur",
    "responsable",
    "admin",
    "modo",
    "modo-test"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    if (args[0] === '') args.shift();
    if (args[0]) {
        const user = Fonctions.getUserFromMention(client, args[0]);
        if (!user) return message.reply('Veuillez mentionner une personne');

        let role = Fonctions.getRole(message, Fonctions.DevOrNot(["roles","validate"]));
        user.addRole(role).catch(console.error);
        message.delete();
        console.log(`${chalk.blue(message.author.tag)} Approved ${chalk.gray(user.user.tag)}`);
        return message.channel.send(`${user}, Tu as été validé ! :white_check_mark:`);
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /validate <@user>`);
};