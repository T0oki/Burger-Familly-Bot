const config = require('../../config/master.json');                     // Load Master Config
const Fonctions = require("../../fonctions.js");                       // Load Fonctions
module.exports.help = {
    name : "BROADCAST",
    description : "envoie une annonce",
    example : "/broadcast [Contenue de l'annonce]",
    alias : [
        "ANNONCE",
        "NEWS"
    ]
};

module.exports.run = async (client, message,args) => {

    // Permission Check
    if(!Fonctions.hasRole(message.member, [
        "directeur",
        "responsable",
        "admin"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    if(!args) return message.reply("Veuillez entrer un message valide");
    message.delete(1);
    client.guilds.get(config.DevMode ? config.dev.guild_id : config.normal.guild_id)
        .channels.get(config.DevMode ? config.dev.broadcast_channel : config.normal.broadcast_channel)
        .send(`@everyone,\n${args.slice(0).join(' ')}`);
};