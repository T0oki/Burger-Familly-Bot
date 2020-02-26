const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "SAY",
    description : "Dire quelque chose",
    example : "/say [Message]",
    alias : [
        "DIRE",
        "PARLER",
        "TELL"
    ]
};

module.exports.run = async (client, message, args) => {

    // Permission Check
    if(!Fonctions.hasRole(message.member, [
        "directeur",
        "responsable",
        "admin"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    message.delete();
    message.channel.send(args.slice(0).join(' '));
};