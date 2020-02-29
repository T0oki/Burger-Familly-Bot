
module.exports = client => {
    const chalk = require('chalk');                                     // require chalk

    console.log(`Identity : ${chalk.magenta(client.user.tag)}!`);
    const config = require('../config/master.json');
    //client.user.setActivity(config.status.name, {type: 'STREAMING', url: 'https://www.twitch.tv/tooki202'}).then(() => console.log('status defined !'));
    //client.user.setActivity('Microsoft - Visual Studio');
};