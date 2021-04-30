const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    if(!message.member.roles.cache.has("727698020669587477") && !message.member.hasPermission("ADMINISTRATOR")) return;
    let embed = new MessageEmbed().setColor("RANDOM")
	let member = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let avatar = member.avatarURL({ dynamic: true, size: 2048 });
    
	message.channel.send(embed .setAuthor(member.tag, avatar).setDescription(`[Resim Adresi](${avatar})`).setImage(avatar).setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true })))
 	
}

exports.conf = { enabled: true, guildOnly: true, aliases:["avatar"] }

exports.help = { name: "avatar"}