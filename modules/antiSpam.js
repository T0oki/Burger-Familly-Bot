const Fonctions = require("../fonctions.js");                      // Load Fonctions
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 3*1000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Merci d\'arreter de spam !', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{@user}** a été kick pour spam.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{@user}** a été bannis pour spam.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoredRoles : [
        Fonctions.DevOrNot(['roles', 'developer']),
        Fonctions.DevOrNot(['roles', 'directeur']),
        Fonctions.DevOrNot(['roles', 'responsable']),
        Fonctions.DevOrNot(['roles', 'admin']),
        Fonctions.DevOrNot(['roles', 'modo']),
        Fonctions.DevOrNot(['roles', 'modo-test'])
    ],
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});
antiSpam.on('kickAdd', (member) => {
    member.lastMessage.channel.fetchMessages({ limit:100 }).then(messages => {
        messages = messages.filter(m => m.author.id === member.user.id);
        member.lastMessage.channel.bulkDelete(messages)
            .catch(console.error);
    });
});
module.exports.help = {
    name : "AntiSpam",
    event : "message"
};
module.exports.run = (client, message) => {
    if (message.author.bot) return;
    antiSpam.message(message).catch(console.error);
};