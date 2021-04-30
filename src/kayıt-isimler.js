const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const config = require("../config.json")
module.exports.run = async (client, message, users, args) => {

    if(!message.member.roles.cache.has(config.RegisterYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;
    

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
var sayi = 1
let data = db.get(`isim.${message.guild.id}`)
let rol =  db.get(`rol.${member.id}`)

if(!data) return message.channel.send(new MessageEmbed().setColor("0x2f3136").setAuthor(isim.user.tag, isim.user.avatarURL({dynamic: true})).setDescription(`${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`).setColor("0x2f3136"))

let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.name} | ${x.age}\`  (<@&${rol}>)\n`).join("\n")

if(!isimler) return message.channel.send(new MessageEmbed().setColor("0x2f3136").setAuthor(isim.user.tag, isim.user.avatarURL({dynamic: true})).setDescription(`${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`).setColor("0x2f3136"))


message.channel.send(new MessageEmbed().setColor("0x2f3136").setThumbnail(member.user.avatarURL ({ dynamic: true})).setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`).setDescription(`${isimler}`).setColor("0x2f3136"))

}


exports.conf = { enabled: true, guildOnly: false, aliases: ['isimler', 'eski-isim'], permLevel: 0, }

exports.help = { name: "isimler" }