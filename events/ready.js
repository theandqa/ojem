const Discord = require("discord.js");
const config = require("../config.json");
module.exports = client => {
client.user.setPresence({ activity: {name: config.Ready, type: config.ReadyType,}, status: config.ReadyStatus})
.then(console.log(config.BotReady)).catch()
};