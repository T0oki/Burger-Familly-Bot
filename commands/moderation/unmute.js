const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "UNMUTE",
    description : "Dé-mute l'utilisateur",
    example : "/unmute <@user>",
    alias : [
        "PARLE"
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

        message.delete();
        const embed = {
            "color": 16468979,
            "footer": {
                "icon_url": message.author.avatarURL,
                "text": "Autheur : " + message.author.username
            },
            "thumbnail": {
                "url": "https://image.flaticon.com/icons/png/512/1231/1231089.png"
            },
            "author": {
                "name": user.displayName + " a été dé-muté",
                "icon_url": user.user.avatarURL
            }
        };
        await message.channel.send({embed});

        // warn save table set values
        message.guild.channels.forEach((channel) => {
            channel.replacePermissionOverwrites({
                "overwrites": channel.permissionOverwrites.filter(o => o.id !== user.user.id)
            });
        });
        if (user.nickname.startsWith('[Muted] ')) await user.setNickname(user.nickname.slice(8));
        console.log(`${chalk.blue(message.author.tag)} unmute ${chalk.gray(user.user.tag)}`);

        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /unmute <@user>`);
};