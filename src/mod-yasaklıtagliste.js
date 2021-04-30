const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return;

let data = db.get(`Yasaklıtagliste.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Listelenecek Yasaklı Tag Bulunmadı.`))

var sayi = 1;
let liste = data.map(x => `${x.yasaklıtagliste}`).join(" \`|\` ")
message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`• Tüm Yasaklı Tag(lar) Aşağıda Listelenmiştir: \n\n **❯** ${liste}`))
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["yasaklıtagliste", "yasaklıtaglar"] }

exports.help = { name: "liste" }