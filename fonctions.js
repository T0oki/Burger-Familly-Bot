const fs = require("fs");
const chalk = require('chalk');                                     // require chalk
const config = require('./config/master.json');                     // Load Master Config
const Fonctions = require("./fonctions.js");                       // Load Fonctions
const mysql = require('mysql');
const database_config = require('./config/database.json');


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
            client.help.set(props.help.example, props.help.description)
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
    const database = MysqlCreateConnection();

    database.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
        }
        // connexion établie
    });
    let sql = `INSERT INTO ${table} (${columns}) VALUES ?`;
    database.query(sql, [[values]], function (err) {
        if (err) throw err;
    });
    database.end((err) => {
        if(err) throw err;
    });

};
exports.MysqlSelect = function (request, callback) {
    const database = MysqlCreateConnection();

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

exports.MysqlUpdate = function (table, column, value, where) {
    const database = MysqlCreateConnection();

    database.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
        }
        // connexion établie
    });
    let sql = `UPDATE ${table} SET ${column} ='${value}' WHERE ${where}`;
    database.query(sql,[], function (err) {
        if (err) throw err;
    });
    database.end((err) => {
        if(err) throw err;
    });

};

exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function MysqlCreateConnection() {
    return mysql.createConnection({
        host: database_config.host,
        user: database_config.user,
        password: database_config.password,
        database: database_config.database
    });
}

exports.findLvl = function (xp) {
    let nxtlvl = 150, level, totalxp = nxtlvl;
    for ( level = 0; xp >= nxtlvl; level++){
        xp -= nxtlvl;
        nxtlvl += 150;
        totalxp += nxtlvl;
    }

    return [level, Math.floor((100*xp)/nxtlvl), totalxp];
};