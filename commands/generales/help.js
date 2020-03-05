module.exports.help = {
    name : "HELP",
    description : "Affiche l'aide",
    example : "/help",
    alias : [
        "?",
        "AIDE"
    ]
};


module.exports.run = async (client, message) => {

    //Commande functions
    let help = "";
    client.help.forEach((description, name) => {
    help += `\`\`\`${name.toLowerCase()} :\n${description}\`\`\``;
    });
    message.channel.send(help);
};

