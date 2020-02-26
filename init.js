exports.Start = function () {
    const config_dir = `${__dirname}/config/`;
    const config = require(`${config_dir}master.json`);                     // Load Master Config
    const token = require(`${config_dir}Token.json`);                       // Load Token Config
    const chalk = require('chalk');                                     // require chalk
    const Discord = require("discord.js");                              // Load Discord.js API
    const fs = require('fs');                                           // Load fs
    const Fonctions = require("./fonctions.js");
    const client = new Discord.Client({ disableEveryone: false });       // Define Client

    client.commands = new Discord.Collection();
    client.help = new Discord.Collection();

    console.log(config.DevMode ? 'Start mode -> Dev' : 'Start mode -> Normal');
    fs.readdir("./commands", (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            if (file.includes('.js')) return;
            Fonctions.IncludeCommands(`./commands/${file}/`, file, client);
        });
    });


    console.log('- Prise en charge des evenements :');
    fs.readdir("./events", (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            console.log(`  - ${chalk.yellow(eventName)}`)
        });
    });
        client.login(config.DevMode ? token.dev : token.general).then(() => console.log('Logged ! '));
};