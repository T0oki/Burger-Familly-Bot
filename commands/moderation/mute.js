const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "MUTE",
    description : "Mute l'utilisateur",
    example : "/mute <@user> [motif]",
    alias : [
        "TG"
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
                "url": "https://images-eu.ssl-images-amazon.com/images/I/41nxAOl8qGL.png"
            },
            "author": {
                "name": user.displayName + " a été muté",
                "icon_url": user.user.avatarURL
            }
        };
        await message.channel.send({embed});

        // warn save table set values
        message.guild.channels.forEach((channel) => {
            if(channel.type === "text"){
                channel.overwritePermissions(user, {'SEND_MESSAGES': false})
            } else if(channel.type === "voice"){
                channel.overwritePermissions(user, {'SPEAK': false})
            }
        });
        await user.setNickname(`[Muted] ${user.nickname ? user.nickname : user.user.username}`);
        console.log(`${chalk.blue(message.author.tag)} mute ${chalk.red(user.user.tag)}`);


        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /mute <@user> [motif]`);
};