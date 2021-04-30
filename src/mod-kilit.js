const Discord = require("discord.js");

  module.exports.run = async(client, message, args, ayar, emoji) => {
    
    let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    let permObjesi = {};
    let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
    everPermleri.allow.toArray().forEach(p => {
      permObjesi[p] = true;
    });
    everPermleri.deny.toArray().forEach(p => {
      permObjesi[p] = false;
    });
    if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
     
    let kilitle = new Discord.MessageEmbed()
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
      .setDescription('Kanal kilitlendi!')
      .setColor('0x2f3136')
      permObjesi["SEND_MESSAGES"] = false;
      message.channel.createOverwrite(everyone, permObjesi);
      message.channel.send({embed:kilitle})
    } else {
      let kilit = new Discord.MessageEmbed()
      .setAuthor(message.member.user.username, message.author.avatarURL({dynamic: true}))
      .setDescription('Kanal kilidi açıldı!')
      .setColor('0x2f3136')
      permObjesi["SEND_MESSAGES"] = null;
      message.channel.createOverwrite(everyone, permObjesi);
      message.channel.send({embed:kilit});
    };
  };
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kilit"],
    permLevel: 0
  };
  
  exports.help = {
    name: "kilit",
    description: "Kanalı istediğiniz kadar süreyle kitler.",
    usage: "kilit"
  };
  