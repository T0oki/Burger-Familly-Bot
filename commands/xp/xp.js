const Fonctions = require("../../fonctions.js");                      // Load Fonctions

module.exports.help = {
    name : "LEVEL",
    description : "Consulter l'xp du joueur",
    example : "/level <@user>",
    alias : [
        "LVL",
        "XP",
        "EXP"
    ],
    display : true
};

module.exports.run = async (client, message, args) => {

    //Commande functions
    if (args[0] === '') args.shift();
    let user;
    if(args[0]) {
        user = Fonctions.getUserFromMention(client, args[0]).user;
    }
    if (!user) user = message.author;
    Fonctions.MysqlSelect(`SELECT * FROM user WHERE uid = '${user.id}'`, function (result) {
        if(result.length <= 0) {
            return message.channel.send(`${user} n'est pas encore inscrit dans la DB`);
        }
        result = result[0];
        let xp = result.xp;

        let lvl = Fonctions.findLvl(xp);


        if (lvl === 0) { lvl = 1; }
        function progressBar() {
            let progress = lvl[1]/100;
            let progressOutOf35 = Math.round(progress * 15);
            return `${'█'.repeat(progressOutOf35)}${'░'.repeat(15 - progressOutOf35)}`;
        }

        Fonctions.MysqlSelect(`SELECT xp, FIND_IN_SET( xp, (    
SELECT GROUP_CONCAT( xp
ORDER BY xp DESC ) 
FROM user )
) AS rank
FROM user
WHERE uid =  '${user.id}'`, function (result) {
            result = result[0];
            const embed = {
                "description" : `__**Level de ${user.username}**__`,
                "footer": {
                    "icon_url": message.author.avatarURL,
                    "text": `Demandé par ${message.author.username}`
                },
                "color": 10948577,
                "thumbnail": {
                    "url": user.avatarURL
                },
                "fields": [
                    {
                        "name": "\u200b",
                        "value": `**:crossed_swords: Level : ${lvl[0]}**`
                    },
                    {
                        "name": `XP : ${xp} / ${lvl[2]}`,
                        "value": progressBar() + `\n:trophy: Rank : #${result.rank}`
                    }
                ]
            };
            message.channel.send({ embed });
        });

    });
};