const Discord = require('discord.js');
const ms = require("ms");
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let member = message.author
    
  
  
     if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Alarmınızın Süresini Yazmalısınız, Örnek: \`!alarm <1sn/1dk/1sa/1g> \` Şeklinde Yazmalısınız.**`).setColor('GREY')).then(m => m.delete({timeout:10000}))
  let mutezaman = args[0]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

      let sebep = args.slice(1).join(' ');
    if (!sebep) return message.channel.sendEmbed(new Discord.MessageEmbed().setDescription(`**Notunuzu Yazmalısınız, Örnek: \`!alarm <1sn/1dk/1sa/1g> \` Şeklinde Yazmalısınız.**`).setColor('GREY')).then(m => m.delete({timeout:10000}))

    message.channel.send(`<:alarm:794244800718176276> Alarmınızı başarıyla \`${args[0]}\` zaman sonraya kurdum.`).then(m => m.delete({timeout:10000}));
   
                
//süre bitti mesajı
  setTimeout(function(){
    message.channel.send(`<:alarm:794244800718176276> ${member},\`${args[0]}\` önce bir alarm kurmuştunuz. Sebep:\`${sebep}\``).then(m => m.delete({timeout:10000}))
  }, ms(mutezaman));
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["alarm"],
  permLevel: 0
};

exports.help = {
  name: 'alarm',
  description: 'alarm.',
  usage: 'alarm'
};