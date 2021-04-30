const { MessageEmbed, Message } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const moment = require('moment')
const momentt = require("moment-duration-format")
const config = require('../config.json')

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(config.MuteYetki)&& !message.member.hasPermission("ADMINISTRATOR")) return;

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kişi) return 

if(kişi.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");


    let cezatipi = `[CHAT-MUTE]`
    moment.locale("tr")
    if (!args[1]) return message.reply('Bir süre belirt. (\`1s, 1m, 1h, 1d, 1y\`)')
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
    let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``


    let muted = message.mentions.members.first() || message.guild.members.cache.find(c => c.id === args[0]);
    if (!muted) {
        message.reply("lütfen susturulacak üyeyi etiketleyiniz.");
    } else {
        if (muted.roles.highest.position >= message.member.roles.highest.position) {
            message.reply("bu kullanıcı senden daha üst pozisyonda.");
        } else {
            let mutezaman = args[1].replace("sn", "s").replace("dk", "m").replace("sa", "h").replace("gün", "d");
            if (!mutezaman) {
                message.reply("bir zaman girmediniz!");
            } else {
                let sebep = args.slice(2).join(" ") || "Belirtilmedi"
                

                let vakit = mutezaman.replace("m", " dakika").replace("s", " saniye").replace("h", " saat").replace("d", " d");


                try {
                    client.channels.cache.get(config.MuteLog).send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(`GREEN`).setDescription( config.MuteEmoji +` <@${kişi.id}> (\`${kişi.id}\`) üye metin kanallarında susturuldu.

• Zaman: \`${time}\`
• Atılma Tarihi: ${muteatılma}
• Bitiş Tarihi: ${mutebitiş}

• Sebep: \`${sebep}\``)
                    );
                    muted.roles.add(config.Muted);
                    

                } 
                
                catch (e) {
                    
                    console.log(e);
                }

db.push(`ceza.${member.id}`, {
    reason: sebep,
    time: muteatılma,
    user: kişi.id,
    executer: message.author.id,
    type: cezatipi
  })

                setTimeout(async function () {
                    muted.roles.remove(
                        config.Muted,
                        client.channels.cache.get(config.MuteLog).send(
                            new MessageEmbed()
                            .setColor('GREEN')
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                            .setDescription(config.UnMuteEmoji +` <@${kişi.id}> (\`${kişi.id}\`) üyesinin metin kanallarında susturulma cezası sonlandı.

• Zaman: \`${time}\`
• Atılma Tarihi: ${muteatılma}
• Biriş Tarihi: ${mutebitiş}

• Sebep: \`${sebep}\``))

                    );
                }, ms(mutezaman));
            }
        }
    }


}

exports.conf = { enabled: true, guildOnly: true, aliases: ["mute"], permLevel: 0 }

exports.help = { name: "mute"}