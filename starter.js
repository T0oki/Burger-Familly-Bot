const Init = require('./init.js');
const chalk = require('chalk'); // require chalk

let date = new Date(),
    day = date.getDate(),
    month = date.getMonth()+1,
    year = date.getFullYear(),
    hour = date.getHours(),
    minutes = date.getMinutes();

if (month < 10) month = `0${month}`;
if (day < 10) day = `0${day}`;
if (hour < 10) hour = `0${hour}`;
if (minutes < 10) minutes = `0${minutes}`;
let NowDate = `${day}.${month}.${year}-${hour}h${minutes}`;

let fs = require('fs'),
    util = require('util'),
    log_file = fs.createWriteStream(__dirname + `/Logs/debug-${NowDate}.log`, { flags: 'w' }),
    log_stdout = process.stdout;

console.log = function (d) {
    log_file.write(util.format(d) + '\r\n');
    log_stdout.write(util.format(d) + '\r\n');
};


console.log(`${chalk.gray('========================================================================')}
  ____                               ______              _ _ _         
 |  _ \\                             |  ____|            (_) | |        
 | |_) |_   _ _ __ __ _  ___ _ __   | |__ __ _ _ __ ___  _| | |_   _   
 |  _ <| | | | '__/ _\` |/ _ \\ '__|  |  __/ _\` | '_ \` _ \\| | | | | | |  
 | |_) | |_| | | | (_| |  __/ |     | | | (_| | | | | | | | | | |_| |  
 |____/ \\__,_|_|  \\__, |\\___|_|     |_|  \\__,_|_| |_| |_|_|_|_|\\__, |  
                   __/ |                                        __/ |  
           _____  |___/                   _   ____        _    |___/   
          |  __ \\(_)                     | | |  _ \\      | |           
  ______  | |  | |_ ___  ___ ___  _ __ __| | | |_) | ___ | |_   ______ 
 |______| | |  | | / __|/ __/ _ \\| '__/ _\` | |  _ < / _ \\| __| |______|
          | |__| | \\__ \\ (_| (_) | | | (_| | | |_) | (_) | |_          
          |_____/|_|___/\\___\\___/|_|  \\__,_| |____/ \\___/ \\__|    
${chalk.gray('========================================================================')}`);
console.log(chalk.green('Initialisation...'));

Init.Start();