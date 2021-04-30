const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const config = require("../config.json")
const moment = require('moment')
module.exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(config.CezalıYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;     

    let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kişi) return message.channel.send(`Jail'a Kimi Atmam Gerekiyor ?`)
    if(!kişi.roles.highest.position >= message.member.roles.highest.position) return message.reply('Bu Kullanıcı Senden Daha Üst Pozisyonda.');
    
    let zaman1 = args[1];
    if(!zaman1) return message.reply('Bir süre belirtmelisin.\n1s, 1m, 1h, 1d, 1y ')

    zaman1 = zaman1.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
    zaman1 = zaman1.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");

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
    let jailatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let jailbitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
    moment.locale('tr');
    var vakit = zaman1.replace("y", "yıl").replace("m", " dakika").replace("s", " saniye").replace("h", " saat").replace("d", " d");



    let cezatipi = `[CEZALI]`
    let zaman = args[1]
    if(!args[1]) return message.channel.send(`Ne kadar süre jailde duracağını belirtmelisin.\nÖrnek: ${prefix}jail kişi süre sebep`)
    let sebep = args.join(``).slice(args[1].length+args[0].length)
    if(!sebep) return message.reply("Sebep Belirtmelisin !")
    message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription("<@" + kişi + "> (`" + kişi.id +"`) üyesine <@"+message.author.id+"> tarafından **"+sebep+"** nedeniyle **"+zaman+"** süresince <@&"+config.Cezalı+"> rolü verildi.")).then(e => e.delete({timeout:10000}));;
    client.channels.cache.get(config.CezalıLog).send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(config.prefix+`cezasorgu ID komudunu kullanarak, kişinin cezalarını sorgulayabilirsiniz.`).setThumbnail(kişi.user.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription(`${kişi} üyesine **`+zaman+`** süresince <@&`+config.Cezalı+`> rolü verildi. \n\n• Yetkili: <@`+ message.author.id +`> (\``+message.author.id+`\`)\n• Tarih: \`${jailatılma}\` \n• Sebep: \`${sebep}\``))
    


  
    kişi.roles.add(config.Cezalı);
    kişi.roles.cache.forEach(r => { kişi.roles.remove(r.id)
    db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    setTimeout(async () =>{
    kişi.roles.remove(config.Cezalı)
    }, ms(zaman));
    setTimeout(async () =>{
    message.guild.roles.cache.forEach(async r => {
    const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
    if(i != r.id)  return ;
    if(i){kişi.roles.add(i)}//kendi rollerini veriyor
    db.delete(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`)
    })
    }, ms(zaman));



    db.push(`ceza.${kişi.id}`, {
        reason: sebep,
        time: jailatılma,
        user: kişi.id,
        executer: message.author.id,
        type: cezatipi
      })
}

exports.conf = { enabled: true, guildOnly: false, aliases: ['tempjail',"cezalı"] }

exports.help = { name: "tempjail" }