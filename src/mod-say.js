const { MessageEmbed } = require("discord.js")
const config = require("../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
    const tag = config.Tag
    const üye = message.guild.memberCount
    const online = message.guild.members.cache.filter(online => online.presence.status != "offline").size + 150
    const booster = message.guild.roles.cache.get(config.Booster).members.size
    const tagsize = message.guild.members.cache.filter(ı => ı.user.username.includes(tag)).size
    const embed = new MessageEmbed().setColor("BLACK").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))

    message.channel.send(embed.setDescription(`**• Toplam üye:  \`${üye}\` 
    • Aktif üye:  \`${online}\`
    • Taglı üye:  \`${tagsize+200}\`
    • Booster üye:  \`${booster}\`
    • Sesteki üye:  \`${count}\`**`))

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["say"]}

exports.help = { name: "say" }