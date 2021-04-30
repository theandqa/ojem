const ayarlar = require('../config.json');
const prefix = ayarlar.prefix;
const Discord = require('discord.js')

exports.run = function(client, message, args)
 {
   if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");

   //var  = args[0];
   if(!args[0])
   return message.channel.send(" Lütfen Silinicek Mesaj Miktarını Yazın.!");
    message.channel.bulkDelete(args[0]).then(() =>
  {
    message.channel.send(`Başarılı Toplamda ${args[0]} Adet Mesajı Sildim.`)
     .then(message => {
       message.delete({timeout:1500});
     });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["temizle", "clear", "sil"],
  permLevel: 0
};

exports.help = {
  name: "temizle"
}
