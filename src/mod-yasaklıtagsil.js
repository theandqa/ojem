const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json")
module.exports.run = async (client, message, args) => {

if (!message.member.hasPermission('ADMINISTRATOR')) return;
let tag = args[0];

if (!tag) return message.reply("Lütfen bir tag belirtiniz");

let data = db.get(`Yasaklıtagliste.${message.guild.id}`) || []
if (!data.includes(tag)) return message.reply("Zaten olmayan bir tagı silemezsin eşşek sıpası")
let arr = data

removeItemOnce(arr, tag)

db.set(`Yasaklıtagliste.${message.guild.id}`, arr)

console.log(arr)
}
exports.conf = { enabled: true, guildOnly: false, aliases: ["yasaklıtagsil",], permLevel: 0 };

exports.help = { name: "yasaklıtagsil" };

function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }