const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let member = message.mentions.members.first()
    if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`Bir kullanıcı etiketlemelisin.`))
    if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcıyı etiketlemelisin.`))
    if(!member.guild.members) return  message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcıyı etiketlemelisin.`))
    if(!member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında bulunmuyor.`))


    else {

    if(member.voice.channel) 
    message.channel.send(new MessageEmbed().setDescription(`${member} adlı kullanıcı \`${member.voice.channel.name}\` adlı kanalda bulunuyor.`)) ;

    }

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["sesbilgi"] }

exports.help = { name: "sesbilgi"}