const config = require('../../config/master.json');                     // Load Master Config
const Fonctions = require("../../fonctions.js");                       // Load Fonctions
module.exports.help = {
    name : "STREAMBROADCAST",
    description : "envoie une annonce de stream",
    example : "/strambroadcast [Contenue de l'annonce]",
    alias : [
        "STREAMANNONCE"
    ],
    display : true
};

module.exports.run = async (client, message,args) => {

    // Permission Check
    if(!Fonctions.hasRole(message.member, [
        "developer",
        "directeur",
        "responsable",
        "admin"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    if(!args) return message.reply("Veuillez entrer un message valide");
    message.delete(1);
    client.guilds.get(Fonctions.DevOrNot(["guild_id"]))
        .channels.get(Fonctions.DevOrNot(["channels", "stream_annonce"]))
        .send(`<@&${Fonctions.DevOrNot(["roles", "steam_notif"])}>,\n${args.slice(0).join(' ')}`);
};