const fs = require("fs");
const chalk = require('chalk');                                     // require chalk
const config = require('./config/master.json');                     // Load Master Config
const Fonctions = require("./fonctions.js");                       // Load Fonctions



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

        return client.guilds.get(Fonctions.DevOrNot(["guild_id"])).members.get(mention);
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
        if (member.roles.has(Fonctions.DevOrNot(["roles", oneRole]))) access = true;
    });
    return access;
};

exports.DevOrNot = function (configKey = []) {
    if(configKey[2]){
        let arg1 = configKey[0], arg2 = configKey[1], arg3 = configKey[2];
        if (config.DevMode) {
            return config.dev[arg1][arg2][arg3];
        } else {
            return config.normal[arg1][arg2][arg3];
        }
    } else if (configKey[1]){
        let arg1 = configKey[0], arg2 = configKey[1];
        if (config.DevMode) {
            return config.dev[arg1][arg2];
        } else {
            return config.normal[arg1][arg2];
        }
    } else if (configKey[0]){
        let arg1 = configKey[0];
        if (config.DevMode) {
            return config.dev[arg1];
        } else {
            return config.normal[arg1];
        }
    }
};

exports.MysqlInsert = function (table, columns, values) {
    const mysql = require('mysql');
    const database_config = require('./config/database.json');

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
    const database = mysql.createConnection({
        host: database_config.host,
        user: database_config.user,
        password: database_config.password,
        database: database_config.database
    });

    database.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
        }
        // connexion établie
    });
    let sql = `INSERT INTO ${table} (${columns}) VALUES ?`;
    database.query(sql, [[values]], function (err, result) {
        if (err) throw err;
    });
    database.end((err) => {
        // Connexion close
    });

};
exports.MysqlSelect = function (request, callback) {
    let return_var = "";
    const mysql = require('mysql');
    const database_config = require('./config/database.json');

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
    const database = mysql.createConnection({
        host: database_config.host,
        user: database_config.user,
        password: database_config.password,
        database: database_config.database
    });

    database.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
        }
        // connexion établie
    });
    database.query(request, (err,rows) => {
        if(err) throw err;
        return callback(rows);
    });
    database.end((err) => {
        if(err) throw err;
    });

};