const {MessageEmbed} = require("discord.js");
const config = require("../config.json")

exports.run = async (client, message, args) => {

  if(!message.member.voice.channel) return
  let kullanıcı = message.mentions.members.first();
  if(!kullanıcı) return message.channel.send("**Kimi kanalınıza çekmek istediğinizi belirtin.**");
  if(kullanıcı.id === message.member.id) return
  if(!kullanıcı.voice.channel) return message.reply(`Çekmek istediğiniz üye ses kanallarında olmalıdır.`).then(msg => msg.delete({timeout:3000}));
    
  if(message.member.voice.channel.id === kullanıcı.voice.channel.id) return
  const voiceChannel = message.member.voice.channel.id;
  if (!voiceChannel) return;

  if (message.member.hasPermission("ADMINISTRATOR")) {
  await  message.guild.member(kullanıcı.id).voice.setChannel(message.member.voice.channel.id);

  } else {

  const filter = (reaction, user) => { return ['yep','no'].includes(reaction.emoji.name) && user.id === kullanıcı.id;};
  let log = new MessageEmbed().setColor('0x2f3136').setDescription(`${kullanıcı}, ${message.author} Odasına çekmek İstiyor. Kabul Ediyormusun ?`)
  let mesaj = await message.channel.send(kullanıcı,log);

  await mesaj.react(config.MessageReactCheck);
  await mesaj.react(config.MessageReactCross);
          
  mesaj.awaitReactions(filter, {max: 1,time: 60000,errors: ['time']}).then(collected => {

  const reaction = collected.first();
  if (reaction.emoji.name === 'yep') {
  mesaj.delete({timeout:100})

  let embedx = new MessageEmbed().setColor('0x2f3136').setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${kullanıcı}, ${message.member} tarafından odaya çekildi!`);
  message.channel.send(embedx).then(msg => msg.delete({timeout:5000}));

  message.guild.member(kullanıcı.id).voice.setChannel(message.member.voice.channel.id)

  } else  if (reaction.emoji.name === 'no') {

  mesaj.delete({timeout:100})
  let embedx = new MessageEmbed().setColor('0x2f3136').setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${message.member}, ${kullanıcı} üyesi odaya çekme isteğinizi reddeti!`);         
  message.channel.send(embedx).then(msg => msg.delete({timeout:5000}));
  
    };
  });
 }
};

exports.conf = { enabled: true, guildOnly: true, aliases: [], permLevel: 0 }

exports.help = { name: "çek" }  