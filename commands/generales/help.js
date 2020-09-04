module.exports.help = {
    name : "HELP",
    description : "Affiche l'aide",
    example : "/help",
    alias : [
        "?",
        "AIDE"
    ],
    display : true
};

const Discord = require("discord.js");                                      // Load Discord.js API

module.exports.run = async (client, message) => {

    //Commande functions
    const embed = new Discord.RichEmbed()
        .setColor('4AEF5B')
        .setAuthor("Liste des commandes :", "https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Terminal-Pc-104-icon.png")
        .setFooter("Voici la liste des commandes", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Information_icon_alt.svg/480px-Information_icon_alt.svg.png");


    client.help.forEach(cat => {
        let cat_title = `${cat.emoji} __${cat.name}__ : `,
            cat_cmd = "``";
        cat.commandes.forEach(cmd => {
            cat_cmd+= cmd.toLowerCase() + "`` | ``"
        });
        cat_cmd = cat_cmd.slice(0, -5);

        embed.addField(cat_title, cat_cmd);
    });

    await message.channel.send({embed}).catch();
};

