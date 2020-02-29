const config = require('../config/master.json');

module.exports = (client, message) => {
    if (message.author.bot ||
        message.channel.type === "dm" ||
        !message.guild.members.get(client.user.id).permissions.has('ADMINISTRATOR')
    ) return;

    let prefix = config.CmdPrefix,
        messageArray = message.content.split(' '),
        command = messageArray[0].toUpperCase(),
        args = messageArray.slice(1);

    if (message.content.startsWith(prefix)) {
        let commandFile = client.commands.get(command.slice(prefix.length));
        if (commandFile) {
            commandFile.run(client, message, args);
        }
    }
};