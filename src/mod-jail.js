const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");
const ms = require("ms");
var moment = require("moment");
moment.locale("tr");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(config.CezalıYetki) && !message.member.hasPermission('ADMINISTRATOR')) return
  
  let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) 
  if(!member) return message.channel.send("Lütfen bir kullanıcı belirtiniz")
  if(member.hasPermission("ADMINISTRATOR")) return
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");

  let sebep = args.slice(1).join(" ");
  if(!sebep) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor(message.member.displayHexColor).setDescription("Ceza sebebini girmek zorundasınız.")).then(e => e.delete({timeout:10000}));; db.delete("jail_" + member.id) 


  moment.locale("tr")
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let reason;
  var tarih = new Date(Date.now())
  var tarih2 = ms(timereplace)
  var tarih3 = Date.now() + tarih2
  let atılmaay = moment(Date.now()).format("MM")
  let atılmagün = moment(Date.now()).format("DD")
  let atılmasaat = moment(Date.now()).format("HH:mm:ss")
  let bitişay = moment(tarih3).format("MM")
  let bitişgün = moment(tarih3).format("DD")
  let bitişsaat = moment(tarih3).format("HH:mm:ss")
  let cezaatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
  let cezabitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``


  let cezatipi = `[CEZALI]`
  let kontrol = db.fetch("jail_" + member.id);
  if(kontrol) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL()).setColor(message.member.displayHexColor).setDescription("Kullanıcı zaten cezalı.")).then(e => e.delete({timeout:10000}));;

  message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({ dynamic: true})).setColor(message.member.displayHexColor).setDescription("<@" + member + "> (`" + member.id +"`) üyesine <@&"+config.Cezalı+"> rolü verildi.")).then(e => e.delete({timeout:10000}));;
  message.guild.members.cache.get(member.id).roles.remove(member.roles.cache.filter(r => r.id).map(r => r.id))

  let cezarollerikayıtı = [];
  member.roles.cache.filter(r => r.id).map(r => {cezarollerikayıtı.push(r.id)})
  db.set(`cezarolleri.${member.id}`, cezarollerikayıtı)
  await member.roles.add("727698040781275277");

  client.channels.cache.get(config.CezalıLog).send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(config.prefix+`cezasorgu ID komudunu kullanarak, kişinin cezalarını sorgulayabilirsiniz.`).setThumbnail(member.user.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription(`${member} üyesine <@&`+config.Karantina+`> rolü verildi. \n\n• Yetkili: <@`+ message.author.id +`> (\``+message.author.id+`\`)\n• Tarih: \`${cezaatılma}\` \n• Sebep: \`${sebep}\``))

  db.push(`ceza.${member.id}`, {
    reason: sebep,
    time: cezaatılma,
    user: member.id,
    executer: message.author.id,
    type: cezatipi
  })

  db.add(`cezasayi.${member.id}`, 1)

};
exports.conf = {  enabled: true,  guildOnly: true,  aliases: ["ceza", "jail","karantina" ] }

exports.help = {  name: "cezalı" }