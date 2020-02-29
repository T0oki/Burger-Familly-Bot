module.exports.run = async (client, message) => {

    //Commande functions
    let Ping = Date.now() - message.createdTimestamp;
    await message.reply(' :ping_pong: ' + Ping + ' ms')

};

module.exports.help = {
    name : "PING",
    description : "PING",
    alias : [
        "PONG",
        "TCHIN"
    ]
};