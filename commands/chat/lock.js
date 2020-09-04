const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "LOCK",
    description : "Verouiller le channel",
    example : "/lock",
    alias : [
        "CLOSE",
        "FERMER"
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
        "animateur"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    message.delete();
    await message.channel.overwritePermissions(
        message.guild.defaultRole,
        {'SEND_MESSAGES': false},
        `locked by ${message.author.tag}`
    );
    const embed = {
        "fields": [
            {
                "name": ":lock: Salon verouillé !",
                "value": "Vous ne pouvez plus parler ici"
            }
        ],
        "color": 16098851
    };
    await message.channel.send({ embed });
};