exports.Start = function () {
    const config_dir = `${__dirname}/config/`;
    const config = require(`${config_dir}master.json`);                     // Load Master Config
    const token = require(`${config_dir}Token.json`);                       // Load Token Config
    const chalk = require('chalk');                                     // require chalk
    const Discord = require("discord.js");                              // Load Discord.js API
    const fs = require('fs');                                           // Load fs
    const Fonctions = require("./fonctions.js");
    const schedule = require('node-schedule');
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

    fs.readdir("./events", (err, files) => {
        if (err) return console.log(err);
        console.log('- Prise en charge des evenements :');
        files.forEach(file => {
            const event = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            console.log(`  - ${chalk.yellow(eventName)}`)
        });
    });
    fs.readdir("./modules", (err, files) => {
        if (err) return console.log(err);
        console.log('- Prise en charge des modules :');
        files.forEach(file => {
            const module = require(`./modules/${file}`);
            client.on(module.help.event, module.run.bind(null, client));
            console.log(`  - ${chalk.yellow(module.help.name)}`)
        });
    });
    fs.readdir("./chrone", (err, files) => {
        if (err) return console.log(err);
        console.log('- Prise en charge des chrone :');
        let files_name = "";
        files.forEach(file => {
            const chrone = require(`./chrone/${file}`);
            files_name += `${chrone.help.name} `;
            schedule.scheduleJob(chrone.help.chrone, () => {
                chrone.run(client, config).catch(err => console.log(err));
            });
            console.log(`  -> ${chalk.yellow(files_name)}`)
        });
    });

    client.login(config.DevMode ? token.dev : token.general).then(() => console.log('Logged ! '));
};