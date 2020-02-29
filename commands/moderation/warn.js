const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "WARN",
    description : "Avertis l'utilisateur",
    example : "/warn <@user> [motif]",
    alias : [
        "AVERT"
    ]
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

        let reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Veuillez entrer une raison');
        message.delete();
        const embed = {
            "description": "```" + reason + "```",
            "color": 16468979,
            "footer": {
                "icon_url": message.author.avatarURL,
                "text": "Autheur : " + message.author.username
            },
            "thumbnail": {
                "url": "https://cdn.pixabay.com/photo/2012/04/12/22/25/warning-sign-30915_960_720.png"
            },
            "author": {
                "name": user.displayName + " a été avertis",
                "icon_url": user.user.avatarURL
            }
        };
        await message.channel.send({embed});

        // warn save table set values
        Fonctions.MysqlInsert("warn", "author, target, reason", [message.author.tag, user.user.tag, reason]);


        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /avert <@user> [motif]`);
};