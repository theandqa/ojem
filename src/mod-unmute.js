const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json")


module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.MuteYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let embed = new MessageEmbed().setColor("GREEN").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    let member = message.mentions.members.first()
    if(!member) return message.channel.send(embed.setDescription(`Geçerli bir kullanıcıyı etiketleyiniz`))
    if(!member.guild.members) message.channel.send(embed.setDescription(`Etiketlediğiniz kullanıcı sunucuda bulunmamaktadır.`))
    if(!member.roles.cache.has(config.Muted)) return message.channel.send(embed.setDescription(`Etiketlediğiniz kullanıcı muteli değil.`))

    else {
    member.roles.remove(config.Muted)

    message.channel.send(embed.setDescription(`${member} adlı kullanıcının mutesi <@${message.author.id}> yetkilisi tarafından açıldı.`))
    }
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["unmute"] }

exports.help = { name : "unmute" }