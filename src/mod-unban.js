const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const prefix = config.prefix;

module.exports.run = async(bot, message, args) => {
    if(!message.member.roles.cache.has(config.BanYetki) && !message.member.hasPermission("ADMINISTRATOR")) return
    const tagged = message.mentions.members.first()
    let member = tagged || args[0]

    const bans = await message.guild.fetchBans(true)

    const bannedmember = bans.find(m => `${m.user.username}#${m.user.discriminator}` == member || m.user.id === member)

    if(bannedmember === undefined) {

        return message.channel.send(new MessageEmbed().setDescription("Belirtilen üye yasaklı değil.").setColor("RED").setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true }))).then(message => message.delete({ timeout: 15000})) 
    }
   
    try{
        message.guild.members.unban(bannedmember.user)
        let embed = new MessageEmbed().setColor("GREEN").setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true })).setDescription("<@"+member+"> üyesinin yasağı kaldırıldı.")
       message.channel.send(embed).then(message => message.delete({ timeout: 15000}))
    }
    catch(err){
        console.log(err.message)
    }
}
    
    exports.conf = { enabled: true, guildOnly: true, aliases: ["unban"], PermLvl: 0, };
    
    exports.help = { name: 'uban' };