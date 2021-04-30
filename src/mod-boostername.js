const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const config = require("../config.json");

module.exports.run = (client, message, args) => {

    if(!message.member.roles.cache.has(config.Booster)) return;


    let member = message.member;
    let Name = args[0] || args.slice(0).join(' ')
    if(!Name) return message.channel.send("Geçerli bir isim giriniz.")
    if(Name.length>=32) return message.channel.send("Geçerli bir isim giriniz.")
    if(message.mentions.members.first()) return;
    member.setNickname(config.Tag+" "+ Name)
    message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`Yeni Adınız; \n\n**${Name}**`)).then(msg => msg.delete({timeout: 5000}))
}

exports.conf = { enabled: true, guildOnly: true, aliases:["para", "nick", "booster"] }

exports.help = { name: "boostername"}