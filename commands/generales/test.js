const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "TEST",
    description : "test cmd",
    example : "/test",
    alias : [],
    display: false
};

module.exports.run = async (client, message, args) => {

    if(!Fonctions.hasRole(message.member, [
        "developer"
    ])) return message.reply("Vous n'avez pas la permission");
    if (args[0] === '') args.shift();
    if (args[0]) {
        const user = Fonctions.getUserFromMention(client, args[0]);
        if (!user) return message.reply('Veuillez mentionner une personne');
    return console.log(user.user.username);
    }
    const embed = {
        "description" : "<:VBuck:684185957716852765> **+ 1500**",
        "color": 16098851
    };
    await message.channel.send({ embed });
};