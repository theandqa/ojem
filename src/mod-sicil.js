const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {

  if(!message.member.roles.cache.has(config.CezalıYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;
  
  let member = message.mentions.members.first() || args[0] 

 // let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.author;
  let sayi = 1;
  let cezadata = db.fetch(`ceza.${member.id}`)
  if(!cezadata) return   message.channel.send(new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.author.tag,message.author.avatarURL({dynaic: true})).setDescription(`Üyenin ceza kaydı temiz.`))

  let cezaliste = cezadata.filter(x => x.user === member.id).map(x => `\`${sayi++}.\` **${x.type}** Sebep: \`${x.reason}\` Tarih: ${x.time} Yetkili: <@${x.executer}>`).join("\n")
  let yazi = `Belirtilen üyenin ceza geçmişi.`
 
  message.channel.send(new MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription(`\`>\` ${yazi} \n\n ${cezaliste}`))


  
}

exports.conf = { enabled: true, guildOnyl: true, aliases: ["sicil"] }

exports.help = { name: "sicil" }