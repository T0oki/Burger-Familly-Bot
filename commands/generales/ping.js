module.exports.help = {
    name : "PING",
    description : "PING",
    example : "/ping",
    alias : [
        "PONG",
        "TCHIN"
    ],
    display : true
};

module.exports.run = async (client, message) => {

    //Commande functions
    let Ping = Date.now() - message.createdTimestamp;
    await message.reply(' :ping_pong: ' + Ping + ' ms')

};