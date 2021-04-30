const Discord = require("discord.js");
const ayarlar = require("../config.json");

exports.run = (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return;
if(args[0] === "ver"){
let x= message.guild.channels.cache.find(a => a.type === "voice" && a.id === args[1])
if(!x){
return message.channel.send("Toplu rol vermek istediğin üyelerin bulunduğu kanalı etiketle!")}
x.members.map(a => {
a.roles.add("727698015774703616")})
message.channel.send(`Toplantıda bulunan tüm yetkililere <@&727698015774703616> rolü dağıtılmaya başlandı.`)///.then(m =>m.delete(5000))
}if(args[0] === "al"){
        message.guild.roles.cache.get("727698015774703616").members.forEach(async uye => await uye.roles.remove("727698015774703616"));
        message.channel.send('Katıldı rolleri alındı!');
      };
    
}
exports.conf = {    enabled: true,    guildOnly: true,    aliases: ["katıldı", "katildi"],   permLevel: 0};
exports.help = {    name: 'topluver'    };