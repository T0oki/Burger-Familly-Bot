const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "CLEAR",
    description : "Clear le channel",
    example : "/clear (Nombre de message)",
    alias : [
        "BOMBE"
    ],
    display : true
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
    args[0] = Number(args[0]);
    if (typeof(args[0]) !== "number") return message.reply('Veuillez entrer un nombre valide !');
    if (args[0] <= 0 || args[0] > 99) return message.reply('Veuillez entrer un nombre entre 1 et 99 !');
    message.channel.fetchMessages({ limit: Number(args[0] + 1) }).then(messages => {
        message.channel.bulkDelete(messages)
            .then(messages => {
                message.channel.send(`\`\`${Number(messages.size - 1 )}\`\` messages ont été supprimés`).then(reply => { reply.delete(5000) })
            })
            .catch(console.error);
    });

};