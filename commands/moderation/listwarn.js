const Fonctions = require("../../fonctions.js");                      // Load Fonctions
const config = require('../../config/master.json');                  // Load Master Config
const chalk = require('chalk');                                     // require chalk

module.exports.help = {
    name : "LISTWARN",
    description : "liste des avertissements de l'utilisateur",
    example : "/listwarn <@user>",
    alias : [
        "WARNS"
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

        Fonctions.MysqlSelect(`SELECT * FROM warn WHERE target = '${user.user.tag}'`, function(result){

            message.channel.send(`Avertissements de ${user} :`);
            let warns ="";
            result .forEach( (row) => {
                warns += `par ${row['author']} : ${row['reason']}\n`;
            });
            message.channel.send("```apache\n"+warns+"```");
        });


        return;
    }

    return message.reply(`
    Utilisation Incorrecte : 
    Utilisation : /listwarn <@user>`);
};