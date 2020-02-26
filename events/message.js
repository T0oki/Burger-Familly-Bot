const config = require('../config/master.json');

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.guild.members.get(client.user.id).permissions.has('ADMINISTRATOR')) return;
    let prefix = config.CmdPrefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0].toUpperCase();
    let args = messageArray.slice(1);
    if (message.content.startsWith(prefix)) {
        let commandFile = client.commands.get(command.slice(prefix.length));
        if (commandFile) {
            commandFile.run(client, message, args);
        }
    }
};