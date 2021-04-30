const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.VMuteYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;


   
    let mention = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
    if(!mention) return message.channel.send(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum.`)
    if(mention.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");
    if(!mention.voice.channel) return message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`Etiketlediğiniz kullanıcı herhangi bir sesli kanalda bulunmamaktadır.`))
    
    if(!mention.voice.setMute(true)) return message.channel.send(new MessageEmbed().setDescription(`${mention} (\`${mention.id}\`) adlı kullanıcı susturulmuş değil.`))
    if(mention.voice.channel) { 
     db.delete(`seslide2.${mention.user.id}.${message.guild.id}`)
     mention.voice.setMute(false);
     message.channel.send(new MessageEmbed().setDescription(`${mention} (\`${mention.id}\`) adlı kullanıcının ses kanallarındaki susturulması <@`+message.author.id+`> yetkilisi tarafından kaldırıldı`))
    }
   
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["vunmute"] }

exports.help = { name: "vunmute" }