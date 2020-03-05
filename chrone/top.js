const Fonctions = require('../fonctions');
module.exports.help = {
  name : "TopActualise",
  chrone : "0 0 * * *"
};
module.exports.run = async (client, config) => {

    let actif_role = Fonctions.DevOrNot(['roles', 'actif']);
    for (const member of client.guilds.get(Fonctions.DevOrNot(['guild_id'])).roles.get(actif_role).members) {
        await member[1].removeRole(actif_role).catch(err => console.log(err)).catch();
    }
    Fonctions.MysqlSelect(`(SELECT uid, FIND_IN_SET( xp, (
SELECT GROUP_CONCAT( xp
ORDER BY xp DESC ) 
FROM user )
) AS rank
FROM user) ORDER BY rank ASC LIMIT 5`, async (result) => {
        let guild = client.guilds.get(Fonctions.DevOrNot(['guild_id']));
        for (const oneMember of result) {
            let member = guild.members.get(oneMember.uid);
            if (!member) continue;
            await member.addRole(actif_role).catch(err => console.log(err));
        }
    });
};