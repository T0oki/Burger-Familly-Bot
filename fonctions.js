const fs = require("fs");
const chalk = require('chalk');                                     // require chalk
const config = require('./config/master.json');                     // Load Master Config



// ======
// Export
// ======

exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};
/**
 * @return {boolean}
 */
exports.Chance = function (Pourcentage) {
    let ResultValue = Math.random() * 100;
    return ResultValue < Pourcentage;
};


exports.IncludeCommands = function (FileDir, CommandTypeString, client) {

    fs.readdir(FileDir, (err, files) => {
        if (err) console.log(err);

        let jsFile = files.filter(f => f.split('.').pop() === 'js');
        let DirColor = (jsFile.length <= 0) ? chalk.red(CommandTypeString) : chalk.green(CommandTypeString);
        console.log(`- Lecture des commandes [${DirColor}] ..`);
        if (jsFile.length <= 0) return;

        jsFile.forEach((f) => {
            let props = require(`${FileDir}${f}`);
            if (!props.help || !props.run) return console.log(`    -> ${chalk.red(f)}`);
            console.log(`    -> ${chalk.yellow(props.help.name)}`);
            client.commands.set(props.help.name, props);
            props.help.alias.forEach((alias) => {
               client.commands.set(alias, props);
            });
            client.help.set(props.help.name, props.help.description)
        });
    });

};

exports.getUserFromMention = function (client, mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.guilds.get(config.DevMode ? config.dev.guild_id : config.normal.guild_id).members.get(mention);
    }
};

exports.getRole = function (message, id, name = false) {
    if (name) {
        return message.guild.roles.find(role => role.name === id);
    } else {
        return message.guild.roles.get(id);
    }
};

exports.hasRole = function (member, roles= []) {
    if (!roles) return false;
    let access = false;
    roles.forEach(oneRole => {
        if (member.roles.has(config.DevMode ? config.dev.roles[oneRole] : config.normal.roles[oneRole])) access = true;
    });
    return access;
};