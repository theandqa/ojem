const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const config = require("../config.json")

module.exports.run = async (client, message, args) => {
  
if(!message.member.roles.cache.has(config.VMuteYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;
if(!args[0]) return message.reply('Bir Kullanıcı Belirt.') 
  let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
  if(!mention) return message.channel.send(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum.`)
  if(mention.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");

  if(await db.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return message.reply('Bu Kullanıcı Zaten Susturulmuş.')


  let cezatipi = `[VOICE-MUTE]`
  if(!args[1]) return message.reply('Bir Süre Belirt.(\`1s, 1m, 1h, 1d, 1y\`) ')
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')

  let reason;
  if(!args[2]) reason = 'Belirtilmedi'
  if(args[2]) reason = args.slice(2).join(' ')
 
  db.add('case', 1)
  const cezasayısı = await db.fetch('case')

 moment.locale("tr")
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2
 let atılmaay = moment(Date.now()).format("MM")
 let atılmagün = moment(Date.now()).format("DD")
 let atılmasaat = moment(Date.now()).format("HH:mm:ss")
 let bitişay = moment(tarih3).format("MM")
 let bitişgün = moment(tarih3).format("DD")
 let bitişsaat = moment(tarih3).format("HH:mm:ss")
 let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
 let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``


if(!mention.voice.channel) return message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`Etiketlediğiniz kullanıcı herhangi bir sesli kanalda bulunmamaktadır.`))



if(mention.voice.channel) {
  
  db.set(`seslide2.${mention.user.id}.${message.guild.id}`, timereplace)
  message.channel.send(config.MuteEmoji +`${mention} ${time} boyunca ses kanallarında susturuldu. (\`#${cezasayısı}\`)`)

  mention.voice.setMute(true)

  client.channels.cache.get(config.VMuteLog).send(new MessageEmbed()
  .setColor('GREEN')
  .setAuthor(message.author.tag, message.author.avatarURL ({ dynamic: true }))
  .setDescription(config.MuteEmoji+`${mention} (\`${mention.user.id}\`) üyesi ses kanallarında susturuldu.
  
• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)  
• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${time}\`

• Sebep: \`${reason}\`
`))



  setTimeout(async () => {
    if(!await db.fetch(`seslide2.${mention.user.id}.${message.guild.id}`)) return;
    if(mention.voice.channel == undefined) {
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atılma`, muteatılma)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.bitiş`, tarih3)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan1`, message.author.tag)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.atan2`, message.author.avatarURL({ dynamic: true }))
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.süre`, time)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.sebep`, reason)
    db.set(`atılamadı.${mention.user.id}.${message.guild.id}.timereplace`, timereplace)
    client.channels.cache.get(config.VMuteLog).send(
    new MessageEmbed()
    .setColor('GREEN')
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${mention} (\`${mention.user.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.

     • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)      
     • Süre: \`${time}\`
     • Sebep: \`${reason}\`
    `))
  } else if(mention.voice.channel) {
  db.delete(`seslide2.${mention.user.id}.${message.guild.id}`)

  mention.voice.setMute(false);

  client.channels.cache.get(config.VMuteLog).send(new MessageEmbed()
  .setColor('RED')
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
  .setDescription(config.UnMuteEmoji +`${mention} (\`${mention.user.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${time}\`

• Sebep: \`${reason}\`
`)) }
  }, ms(timereplace)) }

  db.push(`ceza.${mention.id}`, {
    reason: reason,
    time: muteatılma,
    user: mention.id,
    executer: message.author.id,
    type: cezatipi
  })

  
};
exports.conf = { enabled: true, guildOnly: true, aliases: ["voicemute"], }

exports.help = { name: "vmute" }