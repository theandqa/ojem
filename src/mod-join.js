const Discord = require('discord.js');

exports.run = async (client, message, args) => {    

if (isNaN(args[0])) return message.reply('Bir sayı belirtmelisin.')

const members = message.guild.members.cache.filter(a => !a.user.bot).array().sort((b, a) => b.joinedTimestamp - a.joinedTimestamp) 


const iyiçalmşın = Number(args[0])
if (iyiçalmşın > members.length) {
return message.reply(`Sunucuda ${members.length} üye var!`)}
if(iyiçalmşın < members.length)
//const plural = members.length !== 1
//return message.reply(`Sunucuda ${plural ? '' : ''} sadece ${members.length} üye ${plural ? 'var' : ''}!`)

message.channel.send(new Discord.MessageEmbed().setDescription("<@"+members[iyiçalmşın - 1].user.id+"> üyesi sunucunun "+args[0]+". üyesi."))
}


exports.conf = { enabled: true, guildOnly: false, aliases: ["join"], permLevel: 0};

exports.help = { name: 'join', };