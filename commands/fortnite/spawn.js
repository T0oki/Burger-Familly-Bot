const Fonctions = require("../../fonctions.js");
const villes = [
    "Salty Springs",
    "Frenzy Farm",
    "Pleasant Park",
    "Retail Row",
    "Lazi Lake",
    "Misty Meadows",
    "Holly Hedges",
    "Weeping Wood",
    "Slurpy Swamp",
    "Sweaty Sands",
    "Dirty Docks",
    "Steamy Stacks",
    "Craggy Cliffs",
    "L'agence ",
    "Le Requin",
    "La Plateforme",
    "La Grotte",
    "Le Yacht"
];

module.exports.help = {
    name : "SPAWN",
    description : "Conseille une ville de spawn",
    example : "/spawn",
    alias : [
        "GO"
    ]
};

module.exports.run = async (client, message) => {
    if(!Fonctions.hasRole(message.member, [
        "bus"
    ])) return message.reply("Vous n'avez pas de ticket de bus :ticket:");
    //Commande functions
    await message.reply(`Nous te conseillons d'aller a **${villes[Math.floor(Math.random()*villes.length)]}**, Bon jeu !`);

};