const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../config.json");
module.exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(config.RegisterYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) return message.channel.send("Birini Etiketlemelisin !")
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizden Üst/Aynı Pozsiyondadır.`)
    //if(!member.user.username.includes(config.Tag) && !member.roles.cache.has(config.Booster)) return message.channel.send(new MessageEmbed().setDescription(`Sunucumuz şuan tagsız alıma kapalıdır. Kayıt olmak için \``+config.Tag+`\` alarak kayıt olabilirsin.`))
    if(member.roles.cache.has("727698058170859935")){
        const  geriattı = `${member.user.username.includes(config.Tag) ? config.Tag : config.Tag2} İsim | yaş`;
        member.setNickname(geriattı)
      await member.roles.remove("727698058170859935")
      await member.roles.remove("727698060859408419")
      await member.roles.add("727698061668778034")
    return};
    if(!member.roles.cache.has("727698058170859935")){
    
    let rol = (config.Erkek[0])
    db.set(`rol.${member.id}`, rol)

    db.add(`yetkili.${message.author.id}.erkek`,1 )
    db.add(`yetkili.${message.author.id}.toplam`, 1)  

    let erkek = db.get(`yetkili.${message.author.id}.erkek`);
    let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`)  


    const Name = String(args[1]);
    const Age = Number(args[2]);
    if(Name.length>=32) return message.reply('Geçerli bir isim girmelisin.');
    if(!Name || !Age) return message.reply('Geçerli bir isim ve yaş gir.');
    
    const Tagisim = `${member.user.username.includes(config.Tag) ? config.Tag : config.Tag2} ${Name} | ${Age}`;


    member.setNickname(Tagisim)
    await member.roles.add(config.Erkek);
    await member.roles.remove(config.Unregister);

    message.channel.send(new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    .setFooter(`Toplam Kayıtların: ${kayıtlar}`)
    .setDescription(`**${member} üyesi <@${message.author.id}> tarafından kayıt edildi.\nYeni kullanıcı adı \`${Tagisim}\` olarak değiştirildi.**`))
    
    client.channels.cache.get(config.Chat).send(`${member}, Aramıza hoş geldin keyifli vakit geçirmeni dileriz.`);

    db.push(`isim.${message.guild.id}`,{
       userID: member.id,
       name: Name,
       age: Age
    })}
    
    

}
exports.conf = { enabled: true, guildOnly: true, aliases: ['erkek', 'e'] }

exports.help = { name: "erkek" }