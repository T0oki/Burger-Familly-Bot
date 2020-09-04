const Fonctions = require("../../fonctions.js");

module.exports.help = {
    name : "BUSTICKET",
    description : "prendre un billet de bus",
    example : "/busticket",
    alias : [
        "TICKETBUS"
    ],
    display : true
};

module.exports.run = async (client, message) => {
    //Commande functions
    const embed = {
        "description": "Ce ticket vous permet de prendre le bus pendant une heure",
        "color": 16024308,
        "thumbnail": {
            "url": "https://i.dlpng.com/static/png/6854369_preview.png"
        },
        "author": {
            "name": `Titre de transport de ${message.author.username}`,
            "icon_url": message.author.avatarURL
        }
    };
    await message.channel.send(`${message.author} Voici votre Ticket :`, { embed });
    await message.member.addRole(Fonctions.DevOrNot(['roles', 'bus']));

    setTimeout(async () => {
        await message.member.removeRole(Fonctions.DevOrNot(['roles', 'bus']));
    }, Number(60*60*1000));

};