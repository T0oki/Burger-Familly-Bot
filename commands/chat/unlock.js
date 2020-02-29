const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "UNLOCK",
    description : "Déverouiller le channel",
    example : "/unlock",
    alias : [
        "OPEN",
        "Ouvrir"
    ]
};

module.exports.run = async (client, message, args) => {

    // Permission Check
    if(!Fonctions.hasRole(message.member, [
        "developer",
        "directeur",
        "responsable",
        "admin"
    ])) return message.reply("Vous n'avez pas la permission");

    //Commande functions
    message.delete();
    await message.channel.overwritePermissions(
        message.guild.defaultRole,
        {'SEND_MESSAGES': null},
        `unlocked by ${message.author.tag}`
    );
    const embed = {
        "fields": [
            {
                "name": ":unlock: Salon déverouillé !",
                "value": "Vous pouvez de nouveau parler ici"
            }
        ],
        "color": 2356535
    };
    await message.channel.send({ embed });
};