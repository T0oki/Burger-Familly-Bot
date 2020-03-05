const Fonctions = require("../fonctions.js");                      // Load Fonctions
const config = require('../config/master.json');

module.exports.help = {
    name : "Xp",
    event : "message"
};
module.exports.run = (client, message) => {
    if (message.author.bot ||
        message.channel.type === "dm" ||
        !message.guild.members.get(client.user.id).permissions.has('ADMINISTRATOR')
    ) return;
    if (message.content.startsWith(config.CmdPrefix)) return;
    Fonctions.MysqlSelect(`SELECT * FROM user WHERE uid = '${message.author.id}'`, function (result) {
        if(result.length <= 0) return Fonctions.MysqlInsert('user', 'uid, name', [message.author.id, message.author.username]);
        result = result[0];
        let xp = result.xp,
            last_level =result.level,
            current_level = Fonctions.findLvl(xp)[0],
            xp_reward = xp+Fonctions.getRandomInt(10);
        if(current_level > last_level) {
            message.guild.channels.get(Fonctions.DevOrNot(['channels', "level"])).send(`**__GG__** à toi ${message.author} , Tu viens d'augmenter de **__level__** :tada: \nTu es maintenant level **__${current_level}__** ${Fonctions.DevOrNot(['emojis', 'notif'])} \n\n**GG à toi** :heart: continue ! :wink:`);
            Fonctions.MysqlUpdate('user', 'level', current_level, `uid = ${message.author.id}`);
        }
        Fonctions.MysqlUpdate('user', 'xp', xp_reward, `uid = ${message.author.id}`);
    });
};