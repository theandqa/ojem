const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
 
    if(!message.member.roles.cache.has(config.RegisterYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli Bir Kullanıcı Etiketlemelisin !`).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}))

    if(message.member.roles.highest.position <= member.roles.highest.position) return 
    if(member.manageable)  member.setNickname(member.user.username).catch();


    let digerroller = [];
    member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
    await member.roles.remove(digerroller)


    await member.roles.add(config.Unregister)
    const  geriattı = `${member.user.username.includes(config.Tag) ? config.Tag : config.Tag2} İsim | yaş`;
        member.setNickname(geriattı)

    message.channel.send(new MessageEmbed().setDescription(`${member} Adlı Kullanıcı ${message.author} Tarafından Kayıtsız'a Atıldı !`)).then(msg => msg.delete({timeout: 4000}))

    message.react(config.MessageReactCheck)

}

 exports.conf = { enabled: true, guildOnly: true , aliases: ["kayıtsız", "unregsiter","u"]}

 exports.help = { name: "kayıtsız"}