const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    db.delete(`Yasaklıtagliste.${message.guild.id}`)

    message.channel.send(new MessageEmbed().setTitle(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor("RED").setDescription(`Yasaklı Taglar Temizlendi!`))


}

exports.conf = { enabled: true , guildOnly: true , aliases: ["yasaklıtagtemizle","tagtemizle"] }

exports.help = { name: "yasaklıtagtemizle"}