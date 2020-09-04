const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "KICK",
    description : "Expulse l'utilisateur",
    example : "/kick <@user> (raison)",
    alias : [
        "EXPULSE",
        "BYE"
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
        if(message.member.kickable) return message.reply(`Je n'ai pas la permission de kick ${user}`);
        let reason = args.slice(1).join(' ');
        user.kick(reason)
            .then(() => {
                console.log(`${chalk.blue(message.author.tag)} kick ${chalk.red(user.user.tag)}${reason ? ` for : ${reason}` : ""}`);
                message.channel.send(`${user.displayName} a été expulsé du serveur ! ${reason ? `\nRaison : ${reason}` : ""}`);
            })
            .catch(console.error);
        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /kick <@user>`);
};