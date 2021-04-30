const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
   
    if(!message.member.roles.cache.has(config.CezalıYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) 
    if(!member) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Eksik argüman girildi, Bir üye belirtip tekrar deneyin.").setColor(message.member.displayHexColor)).then(m => m.delete({timeout:10000}))
    if(member.hasPermission("ADMINISTRATOR")) return
    if(!member.roles.cache.has(config.Karantina)&& !member.roles.cache.has(config.Cezalı)) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Etiketlediğin kullanıcı cezalıda değil.").setColor(message.member.displayHexColor)).then(m => m.delete({timeout:10000}))
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");
   
        else {
    if(member.roles.cache.has(config.Karantina) && member.roles.cache.has(config.Cezalı)) 
    message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor(message.member.displayHexColor).setDescription("Etiketlediğin kullanıcı cezalıdan çıkartıldı.")).then(e => e.delete({timeout:10000}));;
    client.channels.cache.get(config.CezalıLog).send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription("<@"+member+"> (\`"+member.id+"\`) Adlı kullanıcı cezalıdan çıkarıldı."))
   
    let roller = db.fetch(`cezarolleri.${member.id}`)
    await member.roles.set(roller)
    await member.roles.add(config.Unregister)
   
    await db.delete(`cezarolleri.${member.id}`)
    await db.delete(`jail_${member.id}`)



}

   message.react(config.MessageReactCheck)
}


exports.conf = { enabled: true, guildOnly: true, aliases: ["cezakaldır", "unjail"] }

exports.help = { name: "unjail" }