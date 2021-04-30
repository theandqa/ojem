const ayarlar = require('../config.json');
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  let guild = message.guild;
  let user = message.mentions.users.first()

  const arthur = new Discord.MessageEmbed()
    .setColor(0x2f3136)
    .setDescription('*Lütfen yargılanacak kişiyi etiketleyiniz.* \n\n **Örnek Kullanımı** = e!yargı @etiket <sebep>')
  const arthur2 = new Discord.MessageEmbed()
    .setColor(0x2f3136)
    .setDescription('*Malesef sahip olduğunuz permler bu işlemi gerçekleştirmek için yeterli değil.* \n\n **İhtiyacınız olan minimum yetki.** = <@&768195903500320819>')
  const arthur4 = new Discord.MessageEmbed()
    .setColor(0x2f3136)
    .setDescription('*Bu işlemi kendi üzerinizde kullanamazsınız.* \n\n **Örnek Kullanımı** = e!yargı @etiket <sebep>')
   if (message.author.bot || message.channel.type === "dm") return;
   if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed:arthur2})
   if (!user) return message.channel.send({embed:arthur});
   if (user == message.author) return message.channel.send({embed:arthur4});
   if(user.id === "688702428509634598"){return message.channel.send(":)")}
   let sebep = args[1];

  if(sebep){
  	let yasaklayankisi = `Yasaklayan : ${message.author.tag} - ${message.author.id}`;
    
  	message.guild.member(user).ban() 			//     `${sebep} | ${yasaklayankisi}`
  let embed3 = new Discord.MessageEmbed()
              .setColor('0x2f3136')
              .setDescription(`${user} sunucudan yasaklandı!"(${sebep})"`)
              .setImage("https://media1.tenor.com/images/c2c094d9bd3bb878bb4cdd2271bda7bc/tenor.gif?itemid=8098842");
  message.channel.send(embed3)
}
if(!sebep){
  message.guild.member(user).ban()
  let embed3 = new Discord.MessageEmbed()
              .setDescription(`${user} sunucudan yasaklandı!"Sebep belirtilmedi!"`)
              .setColor('0x2f3136')
              .setImage("https://media1.tenor.com/images/c2c094d9bd3bb878bb4cdd2271bda7bc/tenor.gif?itemid=8098842");
              
  message.channel.send(embed3)
}
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yargı'],
  permLevel: 0
};

exports.help = {
  name: 'yargı',
  description: 'Belirttiğiniz kullanıcıyı sunucudan yasaklar.',
  usage: 'yargı [kullanıcı] [Sebep]'
};
