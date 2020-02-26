const Init = require('./init.js');
const chalk = require('chalk'); // require chalk

let date = new Date();
let day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minutes = date.getMinutes();
month += 1;
if (month < 10) month = `0${month}`;
if (day < 10) day = `0${day}`;
if (hour < 10) hour = `0${hour}`;
if (minutes < 10) minutes = `0${minutes}`;
let NowDate = `${day}.${month}.${year}-${hour}h${minutes}`;

let fs = require('fs');
let util = require('util');
let log_file = fs.createWriteStream(__dirname + `/Logs/debug-${NowDate}.log`, { flags: 'w' });
let log_stdout = process.stdout;

console.log = function (d) {
    log_file.write(util.format(d) + '\r\n');
    log_stdout.write(util.format(d) + '\r\n');
};


console.log(`${chalk.gray('====================================================')}
  ___      _      _                ______       _   
 / _ \\    | |    | |               | ___ \\     | |  
/ /_\\ \\ __| | ___| | ___   ______  | |_/ / ___ | |_ 
|  _  |/ _\` |/ _ \\ |/ _ \\ |______| | ___ \\/ _ \\| __|
| | | | (_| |  __/ |  __/          | |_/ / (_) | |_ 
\\_| |_/\\__,_|\\___|_|\\___|          \\____/ \\___/ \\__|
${chalk.gray('====================================================')}`);
console.log(chalk.green('Initialisation...'));

Init.Start();