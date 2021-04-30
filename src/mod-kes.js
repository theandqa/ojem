const Discord = require('discord.js');
const config = require("../config.json")

exports.run = async(client, message, args) => {
if (!message.guild) {return}
if (!message.member.roles.cache.has(config.BanYetki) && !message.member.hasPermission('ADMINISTRATOR'))
  return
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  if(!member) return;
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizden Üst/Aynı Pozsiyondadır.`)
  message.guild.member(member.id).voice.setChannel(null)

 let embed = new Discord.MessageEmbed() 
 .setColor("#7289DA")
 .setAuthor(message.author.tag, message.author.avatarURL())
 .setDescription( `${member} Üyesinin Bağlantısı Kesildi.`)
 
   message.channel.send(embed).then(msg => msg.delete({timeout:10000}));
}
exports.conf = { enabled: true, guildOnly: true, aliases: ["kes"] }

exports.help = { name: "kes" }