const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const talkedRecently = new Set();
const config = require("../config.json");
const db = require("quick.db");
const ms = require("ms");
const { parseZone } = require("moment");
const prefix = config.Prefix

module.exports.run = async(client, message, args)  => {

  
    if(!message.member.roles.cache.has(config.BanYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;


 if(!args[0]) return message.channel.send('Bir Kullanıcıyı Etiketlemelisin !')
 let timereplace = args[0];
 let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
 
 db.add('case', 1)
 const banpuan = await db.fetch('case')

 
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2

 let atılmaay = moment(Date.now()).format("MM")
 let atılmagün = moment(Date.now()).format("DD")
 let atılmasaat = moment(Date.now()).format("HH:mm:ss")
 let bitişay = moment(tarih3).format("MM")
 let bitişgün = moment(tarih3).format("DD")
 let bitişsaat = moment(tarih3).format("HH:mm:ss")
 let banatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
 

let cezatipi = `[BAN]`
let reason = args.slice(1).join(' ') || "Belirtilmedi";
let user = message.mentions.users.first() || (args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
let member = message.guild.member(user)
if(!user) return
if(!member) return
if(member.roles.highest.position >= message.member.roles.highest.position) return

  member.ban({days: 7, reason: reason})
  db.set(`tarih_${user.id}`, banatılma)
const banembed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true }))
        .setColor(`GREEN`)
        .setImage("")
        .setDescription(config.BanEmoji +` (<@${member.id}> - \`${member.id}\`) Üyesi Yasaklandı.
      • Yasaklayan : <@${message.author.id}>
      • Tarih : \`${banatılma}\`
      • Sebep : \`${reason}\`
        `
        )
        client.channels.cache.get(config.BanLog).send(banembed) 
        message.react(config.MessageReactCheck)
        
       
     
  db.push(`ceza.${member.id}`, {
    reason: reason,
    time: banatılma,
    user: member.id,
    executer: message.author.id,
    type: cezatipi
  })   

};
exports.conf = { enabled: true, guildOnly: true, aliases: ["ban", "yasakla","infaz"], PermLvl: 0, }

exports.help = { name: 'infaz' };