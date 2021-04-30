const ayarlar = require('../config.json');
const prefix = ayarlar.prefix;
const Discord = require('discord.js')

const fs = require('fs');
const db = require("quick.db");
exports.run = async (bot , message, args) => {

  let reason = args.slice(0).join(' ')
     let rol = message.mentions.roles.first()

  if(reason.toLowerCase().includes(".com") || reason.toLowerCase().includes("youtube.com") || reason.toLowerCase().includes("discord.gg")|| reason.includes("http") || reason.includes(rol) || reason.includes("@here") || reason.includes("@everyone")) return  [message.delete(10),message.reply("Afk nedenine **link** veya **rol** giremezsin").then(msg => msg.delete(9000))]
  if(!reason) reason= "Şu an afkyım, en kısa sürede geri döneceğim.";
      setTimeout(function(){

  db.set(`afk_${message.author.id}, ${message.guild.id}`, reason)

  db.set(`afk-zaman_${message.author.id}, ${message.guild.id}`, Date.now())
      },500)
  message.reply(`seni AFK olarak ayarladım ve mesajını şu şekilde ayarladım: ${reason}`)
  if(!message.member.nickname) return message.member.setNickname("[AFK] " + message.member.user.username)
  message.member.setNickname("[AFK] " + message.member.nickname).catch(err => console.log(err));

  }
exports.conf = {//Proxima Centauri
  enabled: true,
  guildOnly: false,
  aliases: ["afk","awayfromafk"],
  permLevel: 0
};
exports.help = {//HİPPERCOS
  name: 'afk',
  description: 'Kullanıcıyı sunucudan yasaklar.',
  usage: '&afk'
};
