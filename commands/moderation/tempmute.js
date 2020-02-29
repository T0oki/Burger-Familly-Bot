const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "TEMPMUTE",
    description : "Mute l'utilisateur temporairement",
    example : "/tempmute <@user> [motif]",
    alias : []

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

        let time = args[1];

        if(!time ) return message.channel.send("Veuillez entrer un temps & un format ! ");
        let format = time.charAt(time.length-1);
        time = Number(time.substr(0, time.length-1));
        let text = [];
        text.format = "secondes";
        text.time = time;
        switch (format) {
            case 's':
                break;
            case 'm':
                text.format = "minutes";
                time = time*60;
                break;
            case 'h':
                text.format = "heures";
                time = time*60*60;
                break;
            default:
                return message.channel.send("Format invalide !");
        }
        let reason = args.slice(2).join(' ');
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
                    "name": user.displayName + " a été muté "+ text.time +" " +  text.format,
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

        setTimeout(function(){
            message.guild.channels.forEach((channel) => {
                channel.replacePermissionOverwrites({
                    "overwrites": channel.permissionOverwrites.filter(o => o.id !== user.user.id)
                });
            });
            message.channel.send(`${user} a été dé-mute !`);
        }, Number(time * 1000));
        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /mute <@user> [motif]`);
};