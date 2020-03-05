const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "LEADERBOARD",
    description : "Affiche le classement",
    example : "/leaderboard",
    alias : [
        "TOP"
    ]
};

module.exports.run = async (client, message, args) => {

    //Commande functions
    Fonctions.MysqlSelect(`(SELECT name, xp, FIND_IN_SET( xp, (
SELECT GROUP_CONCAT( xp
ORDER BY xp DESC ) 
FROM user )
) AS rank
FROM user) ORDER BY rank ASC`, function (result) {
        const embed = {
            "color": 11978576,
            "footer": {
                "icon_url": message.author.avatarURL,
                "text": "Demmandé par " + message.author.username
            },
            "thumbnail": {
                "url": "https://pngimage.net/wp-content/uploads/2018/06/troph%C3%A9e-png-2.png"
            },
            "author": {
                "name": "Classement des 5 meilleurs Joueurs !"
            },
            "fields": [
                {
                    "name": `:first_place: - ${result[0].name}`,
                    "value": `Avec ${result[0].xp}xp`
                },
                {
                    "name": `:second_place: - ${result[1].name}`,
                    "value": `Avec ${result[1].xp}xp`
                },
                {
                    "name": `:third_place: - ${result[2].name}`,
                    "value": `Avec ${result[2].xp}xp`
                },
                {
                    "name": `4 - ${result[3].name}`,
                    "value": `Avec ${result[3].xp}xp`
                },
                {
                    "name": `5 - ${result[4].name}`,
                    "value": `Avec ${result[4].xp}xp`
                }
            ]
        };
        message.channel.send({ embed });
    });
};