const { User } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: 'mute',
    description: 'mute all on voice',
	async execute(client, message, args) {

    if (!message.member.permissions.has('MUTE_MEMBERS')) return message.reply(`No tienes permisos para mutear a otros.`);

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("No tengo permisos para mutear a otros.");

    if (!args.length) return message.channel.send(`Puedes mutear mencionando a quienes o a todos con **${prefix}mute all**. \nEjemplo: \`${prefix}mute @${message.author.username}\`.`);
    
    if (message.member.voice.channel) {

      if(args.length == '1' && args.join().toLowerCase()=='all'){
            
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        
        const users = [];

        for (const [memberID, member] of channel.members) {
          if (!member.voice.serverMute){
            member.voice.setMute(true);
            users.push(member);
          }
        }
        message.channel.send(`Muteando a ${users.join(', ')}.`)
        .then(msg => {
          msg.delete({ timeout: 10000 })
        });
      }

      //muteando con menciones:

      else if (!message.mentions.members.first()) return message.reply(`Puedes mutear mencionando a quienes o a todos con **${prefix}mute all**. \nEjemplo: \`${prefix}mute @${message.author.username}\`.`);

      message.mentions.members.forEach(async (user)=>{

        if (!user) return message.reply("menciona a quien o quienes quieres mutear.");

        if (user.id === message.author.id) return message.reply("pero para eso muteate tu mismo...");

        if (user.voice.serverMute) return message.reply(`${user} ya estába muteado.`);

        if (!user.voice.channel) return message.reply(`${user} no está en ningún voice.`);

        if (user.voice.channel.id != message.member.voice.channel.id) return message.reply(`${user} no está en el mismo voice que tu.`);

        user.voice.setMute(true);
        
        await message.channel.send(`${user}, te acaba de mutear ${message.author}.`).then(msg => {msg.delete({ timeout: 10000 })});

      });

    }
    else {
      message.reply('No estas en ningun canal de voz.');
    }
	}
};