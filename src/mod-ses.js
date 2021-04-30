const { MessageEmbed } = require("discord.js")
const config = require("../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
    const embed = new MessageEmbed().setColor("BLACK").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))

    message.channel.send(embed.setDescription(`**• Sesli kanallarda \`${count}\` kişi var.**`))

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["ses"]}

exports.help = { name: "ses" }