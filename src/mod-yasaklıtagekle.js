const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json")

exports.run = async (bot, message, args) => {

    const yetki = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(`Yasaklı tag eklemek için yeterli yetkiye sahip değilsin.`)
    .setColor("RANDOM");
    
    const yetkis = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(
    `Yasaklı tag eklemek istiyorsan geçerli bi tag belitmelisin.`
    )
    .setColor("RANDOM");
    
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed:yetki}).then(m => m.delete({timeout:10000}));
if (!args[0]) return message.channel.send({embed:yetkis}).then(m => m.delete({timeout:10000}))
let tag = args[0];
let burak = message.guild.members.cache.filter(membersx => {
return membersx.user.username.includes(tag);
});
const yok = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.setDescription(`Belirttiğin ${tag} tagında kimse yok.`)
.setColor("RANDOM");
let kişiler = burak.size;
if (kişiler == 0) return message.channel.send(yok).then(msg => { msg.delete({timeout: 5000}), message.delete({timeout:5000})});

let data = db.get(`Yasaklıtagliste.${message.guild.id}`) || []
if(data.includes(tag)) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`${tag} Tagı zaten yasaklı tag listesinde var.`))


burak.forEach(async member => {
await member.roles.remove(member.roles.cache.filter(r => r.id).map(r => r.id));
await member.roles.add(config.YasaklıTagRol);
})
db.push(`Yasaklıtagliste.${message.guild.id}`,{
    yasaklıtagliste: tag
})
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.setDescription(
`Belirttiğin ${tag} tagında ${burak.size} kişi var. Hepsine "Yasaklı Tag" rolü ekledim.`
)
.setColor("RANDOM");
message.channel.send(embed).then(msg => { msg.delete({timeout:15000}), message.delete({timeout:15000})});
};

exports.conf = { enabled: true, guildOnly: false, aliases: ["yasaklıtag", "yasaklıtagekle"], permLevel: 0 };

exports.help = { name: "yasaklıtag" };