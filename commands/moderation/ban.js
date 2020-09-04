const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "BAN",
    description : "Bannis l'utilisateur",
    example : "/ban <@user> (raison)",
    alias : [
        "GOODBYE"
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
        "modo"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    if (args[0] === '') args.shift();
    if (args[0]) {
        const user = Fonctions.getUserFromMention(client, args[0]);
        if (!user) return message.reply('Veuillez mentionner une personne');

        message.delete();
        if(message.member.bannable) return message.reply(`Je n'ai pas la permission de ban ${user}`);
        let reason = args.slice(1).join(' ');
        user.ban(reason)
            .then(() => {
                console.log(`${chalk.blue(message.author.tag)} ban ${chalk.red(user.user.tag)}${reason ? ` for : ${reason}` : ""}`);
                message.channel.send(`${user.displayName} a été bannis du serveur ! ${reason ? `\nRaison : ${reason}` : ""}`);
            })
            .catch(console.error);
        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /ban <@user>`);
};