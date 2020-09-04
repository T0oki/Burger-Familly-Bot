const Fonctions = require("../fonctions.js");                      // Load Fonctions
const config = require('../config/master.json');

module.exports.help = {
    name : "AntiLink",
    event : "message"
};
module.exports.run = async (client, message) => {
    if (message.author.bot ||
        message.channel.type === "dm" ||
        !message.guild.members.get(client.user.id).permissions.has('ADMINISTRATOR')
    ) return;
    if(!message.member) return;
    if(Fonctions.hasRole(message.member, [
        "developer",
        "directeur",
        "responsable",
        "admin",
        "modo",
        "modo-test",
        "animateur"
    ])) return;
    let motif ="", time = "";
    if(message.content.includes(".png") || message.content.includes(".jpg") || message.content.includes(".gif") || message.content.includes(".mp4") || message.content.includes("giphy.com") || message.content.includes("tenor.com")){
        return;
    }else if(message.content.includes("discord")){
        motif = "discord";
        time = 432000;
    }else if(message.content.includes("youtube")){
        motif = "youtube";
        time = 86400;
    }else if(message.content.includes("twitch")){
        motif = "twitch";
        time = 86400;
    } else {
        motif = "lien externe";
        time = 86400;
    }
    if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(message.content)) {
        message.delete().catch();
        let user = message.member;
        const embed = {
            "description": "```" + "1E: " + motif + "```",
            "color": 16468979,
            "footer": {
                "icon_url": client.user.avatarURL,
                "text": "Autheur : " + client.user.tag
            },
            "thumbnail": {
                "url": "https://images-eu.ssl-images-amazon.com/images/I/41nxAOl8qGL.png"
            },
            "author": {
                "name": user.displayName + " a été muté "+ ((time === 86400) ? "2" : '5') +" " + "Jours",
                "icon_url": user.user.avatarURL
            }
        };
        message.guild.channels.get(Fonctions.DevOrNot(['channels', 'sanctions'])).send({embed});
        // warn save table set values
        message.guild.channels.forEach((channel) => {
            if(channel.type === "text"){
                channel.overwritePermissions(user, {'SEND_MESSAGES': false})
            } else if(channel.type === "voice"){
                channel.overwritePermissions(user, {'SPEAK': false})
            }
        });
        await user.setNickname(`[Muted] ${user.nickname ? user.nickname : user.user.username}`);
        console.log(`${chalk.blue(message.author.tag)} mute ${chalk.red(user.user.tag)} for ${text.time} ${text.format}`);
        setTimeout(async () =>{
            if(!user.nickname || !user.nickname.startsWith('[Muted] ')) return console.log(`${chalk.red(user.user.tag)} was already unmuted !`);
            message.guild.channels.forEach((channel) => {
                let cp = channel.permissionOverwrites.get(user.user.id);
                if(!cp) return;
                cp.delete('unmute');
            });
            if (user.nickname.startsWith('[Muted] ')) await user.setNickname(user.nickname.slice(8));
            console.log(`${chalk.gray(user.user.tag)} was unmuted`);
            message.channel.send(`${user} a été dé-mute !`);
        }, Number(time * 1000));
    }
};