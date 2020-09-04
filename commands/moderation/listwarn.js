const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const Discord = require('discord.js');

module.exports.help = {
    name : "LISTWARN",
    description : "liste des avertissements de l'utilisateur",
    example : "/listwarn <@user>",
    alias : [
        "WARNS"
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

        Fonctions.MysqlSelect(`SELECT * FROM warn WHERE target = '${user.user.id}'`, function(result){
            if(result.length <= 0) return noWarn(message, user);
            else listWarn(message, user, result);
        });


        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /listwarn <@user>`);
};

function noWarn(message, user) {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(`${user.user.tag} ne possède aucun avertissement`, "https://www.yemp.co/wp-content/uploads/2018/11/red-cross.png")
        .setFooter(`Demmandé par ${message.author.tag}` , message.author.avatarURL);
    message.channel.send({embed}).catch();
}
function listWarn(message, user, result) {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(`Avertissements de ${user.user.tag}`, user.user.avatarURL)
        .setFooter(`Demmandé paar ${message.author.tag}`, message.author.avatarURL)
        .setDescription(`${user.user.tag} Possède ${result.length} avertissements`)
        .addBlankField();
    result.forEach(avert => {

        const dateObject = new Date(avert.insert_time); // our Date object
        let date = cz(dateObject.getDay()) + '/' + cz(dateObject.getMonth()) + '/' + cz(dateObject.getFullYear()) + ' - ' + cz(dateObject.getHours()) + ':' + cz(dateObject.getMinutes());
        embed.addField(`[${date}]`, `__${message.client.users.get(avert.author).tag}__ : ${avert.reason}`);
    });
    embed.addBlankField();
    message.channel.send({embed}).catch();
}

function cz(number) {
    if(number < 10) number = `0${number}`;
    return number;
}