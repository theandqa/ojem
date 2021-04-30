const Discord = require("discord.js");
const config = require("../config.json")

exports.run = async (client, message, args) => {

if(!message.member.voice.channel) return
const filter = (reaction, user) => {
return ['yep','no'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};

  let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!kullanıcı) return message.channel.send('Yanına gitmek istediğiniz kişiyi belirtiniz.')
  let member = message.guild.member(kullanıcı);
  if (!member.voice.channel) return message.channel.send("Etiketleneniz kişi bir sesli kanalda değil").then(m => m.delete(5000));

  const voiceChannel = message.member.voice.channel.id;
  if (!voiceChannel) return;
  if (message.member.hasPermission("ADMINISTRATOR")) {
  await message.member.voice.setChannel(kullanıcı.voice.channelID);

  } else {

  let log = new Discord.MessageEmbed().setColor("#7289DA").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${kullanıcı}, ${message.author} Yanınıza gelmek istiyor. Kabul ediyor musunuz?`)            
   
  let mesaj = await message.channel.send(kullanıcı,log);

  await mesaj.react(config.MessageReactCheck);
  await mesaj.react(config.MessageReactCross);

  mesaj.awaitReactions(filter, {max: 1,time: 60000,errors: ['time']}).then(collected => {

  const reaction = collected.first();
  if (reaction.emoji.name === 'yep') {
  mesaj.delete({timeout:100})

  let embedx = new Discord.MessageEmbed().setColor('#7289DA').setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${kullanıcı} odaya girmenize izin verdi!`); 
  message.channel.send(embedx).then(msg => msg.delete({timeout:5000}));
  
  message.guild.member(message.author.id).voice.setChannel(kullanıcı.voice.channel.id);

  } else  if (reaction.emoji.name === 'no') {
  mesaj.delete({timeout:100})

  let embedx = new Discord.MessageEmbed().setColor('#7289DA').setAuthor(message.author.tag, message.author.avatarURL()).setDescription(` ${kullanıcı} odaya girmenize izin vermedi`);
  message.channel.send(embedx).then(msg => msg.delete({timeout:5000}));

    };
  });
 } 
};

exports.conf = { enabled: true, guildOnly: true, aliases: [],  permLevel: 0 };

exports.help = { name: "git" };