module.exports.run = async (client, message) => {

    let Ping = Date.now() - message.createdTimestamp;
    message.reply(' <:Ping:527993315912712212> ' + Ping + ' ms')

};

module.exports.help = {
    name : "PING",
    description : "PING",
    alias : [
        "PONG",
        "TCHIN"
    ]
};