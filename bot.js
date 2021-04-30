const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
const mmmonet = require("moment-duration-format")
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const ms = require('ms');
const sms = require('parse-ms')
const { monthsShort } = require('moment');
var prefix = config.prefix



client.on("ready", async() => {
    let botvoicechannel = client.channels.cache.get(config.BotVoiceChannel);
    if(botvoicechannel) botvoicechannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı"));
})


client.on("guildMemberAdd", member => {
    member.roles.add(config.Unregister);
  });



client.on("guildMemberAdd", member => {
    var kanal = client.channels.cache.get(config.WelcomeLog)
    let user = client.users.cache.get(member.id);
    require("moment-duration-format")
        const yazi = "tarihinde" 
        const tarih = new Date().getTime() - user.createdAt.getTime();  
        var kontrol;
        if (tarih < 1296000000) kontrol = config.MessageReactCross
        if (tarih > 1296000000) kontrol = config.MessageReactCheck
        moment.locale("tr");  
    kanal.send(`
Hoşgeldin <@`+ member + `> Sunucuya erişim sağlamak için sol tarafta bulunan ses kanallarında teyit vermeniz gerekmektedir. 

Sunucumuzu temsil eden \``+ config.Tag +`\` semblünü kullanıcı adına ekleyerek bize destek olabilir bazı ayrıcılıklara sahip olabilirsiniz.

Seninle beraber \``+ member.guild.memberCount+ `\` kişiyiz :tada: :tada:`)});



client.on("userUpdate", async (oldMember, newMember) => {
    var sunucu = client.guilds.cache.get(config.sunucuid); // Buraya Sunucu ID
    var user = sunucu.members.cache.get(newMember.id);
    var tag2 = config.Tag2;
    var tag = config.Tag; // Buraya Ekip Tag
    var tagrole = config.Tagrol; // Buraya Ekip Rolünün ID
    var taglogchannel = config.TagLog; // Loglanacağı Kanalın ID
  
    if (!sunucu.members.cache.has(newMember.id) || newMember.bot || oldMember.username === newMember.username) return;
    
    if ((newMember.username).includes(tag) && !user.roles.cache.has(tagrole)) {
      try {
        await user.roles.add(tagrole);
        await user.setNickname((user.displayName).replace(tag2, tag));
        await user.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
        await client.channels.cache.get(taglogchannel).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${newMember} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(newMember.username).includes(tag) && user.roles.cache.has(tagrole)) {
      try {
        await user.roles.remove(user.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrole).position));
        await user.setNickname((user.displayName).replace(tag, tag2));
        await user.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
        await client.channels.cache.get(taglogchannel).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${newMember} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });
  
  
  client.on("guildMemberAdd", member => {

  if(member.user.username.includes(config.Tag)){
  member.roles.add(config.Tagrol)
  var tagkanal = client.channels.cache.get(config.TagLog)


    const tagalma = new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`).setTimestamp()
    tagkanal.send({embed:tagalma}) 
  }
  })
  

  client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.content.toLowerCase() === ""+config.prefix+"link") {
        [message.channel.send(""+ config.Link +"")]
    }
})

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.content.toLowerCase() === ""+config.prefix+"tag") {
        [message.channel.send(""+ config.Tag +"")]
    }
})




/*client.on("guildMemberAdd", member => {

    let yasaklıtag = db.get(`yasaklıtagliste.${member.guild.id}`)

    member.user.username.includes(yasaklıtag)
    member.roles.add(config.YasaklıTagRol)
    member.roles.remove(config.Unregister)
    member.send(member.guild.name + ` Adlı Sunucuya Yasaklı Tag ile Giriş Yaptğınızdan Dolayı \`Yasaklı Tag\` Kategorisine Atıldınız.`)
})*/

/*client.on('ready',async () => {
    setInterval(function(){
    const moment = require('moment')
    require('moment-duration-format')
    const Sunucu = client.guilds.get('779044640544260107')
    Sunucu.members.map(x => {
    const HesapT = moment.duration(new Date().getTime() - x.joinedAt.getTime()).format('DD')
    if (HesapT > 30) {
    x.addRole('1 aylık üye')
    Sunucu.channels.get('').send(`${x} üyesine 1 aylık üye rolü verildi.`)
    }
    if (HesapT > 60) {
      x.addRole('2 aylık üye')
      Sunucu.channels.get('').send(`${x} üyesine 2 aylık üye rolü verildi.`)
      }
    })
    }, 86400000)
    })

client.on('message',async message =>{
    if(message.author.bot || message.channel.type === 'dm') return;
    if(message.content ='e!tag') message.channel.send('☤');
})
*/
client.on("message",async message => {
    if (message.author.bot || message.channel.type === "dm") return;
 
   //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
   //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(message => message.delete(9000))
     var afklar = await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
 
   if(afklar){
 
     db.delete(`afk_${message.author.id}, ${message.guild.id}`)
     db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
 
     message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`)
        try{
     let takma_ad = message.member.nickname.replace("[AFK]", "")
     message.member.setNickname(takma_ad).catch(err => console.log(err));
        }catch(err){
 
  console.log(err.message)
   }
   }
   var kullanıcı = message.mentions.users.first()
   if(!kullanıcı) return
    let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
 
 
     var süre = sms(Date.now() - zaman)
 
 
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
   if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
   if(süre.days !== 0){
      message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.days}** Gün **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
    return
    }
   if(süre.hours !== 0){
      message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
    return
    }
   if(süre.minutes !== 0){
      message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
    return
    }
   if(süre.seconds !== 0){
      message.channel.send(`**${kullanıcı}** Kullanıcısı **Bir Kaç Saniye** Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
    return
    }
  }})
const log = message => {
console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
  
fs.readdir('./src/', (err, files) => { 
    if (err) console.error(err);
    log(`${files.length} Komut.`);
    files.forEach(f => {
        let props = require(`./src/${f}`);
        log(`${props.help.name} Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./src/${command}`)];
            let cmd = require(`./src/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./src/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./src/${command}`)];
            let cmd = require(`./src/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.owner) permlvl = 4;
    return permlvl;
}
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(config.token)