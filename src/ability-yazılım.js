const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
var prefix = config.prefix;
exports.run = async (bot , message, args) => {

  if(message.author.bot || message.channel.type === "dm") return;
  if(!message.member.roles.cache.has(config.ability) && !message.member.hasPermission('ADMINISTRATOR')) return
  let embed = new MessageEmbed().setColor("#00ffff")
  let x = config.Yazılım
  var user = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!user) return message.reply ("Bir üye belirtmelsiniz.").then(m => m.delete(9000));
  if(user.roles.cache.has(x)){ 
  user.roles.remove(x);
  message.channel.send(embed.setDescription("<@"+user.id+"> üyesinden <@&"+x+"> rolü alındı. ")).then(msg => msg.delete({ timeout: 15000}))
  }
  if(!user.roles.cache.has(x)){
  user.roles.add(x);
    message.channel.send(embed.setDescription("<@"+user.id+"> üyesine <@&"+x+"> rolü verildi.")).then(msg => msg.delete({ timeout: 15000}))
  }
  }



exports.conf = { enabled: true, guildOnly: false, aliases: ['yazılım'] };

exports.help = { name: 'yazılım' };