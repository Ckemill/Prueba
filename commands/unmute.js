const { User } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: 'unmute',
    description: 'mute all on voice',
	async execute(client, message, args) {

    if (!message.member.permissions.has('MUTE_MEMBERS')) return message.reply(`No tienes permisos para desmutear a otros.`);

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("No tengo permisos para desmutear a otros.");

    if (!args.length) message.member.voice.setMute(false);
    
    if (message.member.voice.channel) {

      if(args.length == '1' && args=='all'){
            
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      
        const users = [];

        for (const [memberID, member] of channel.members) {
          member.voice.setMute(false);
          users.push(member);
        }
        message.channel.send(`Desmuteando a ${users.join(', ')}.`)
        .then(msg => {
          msg.delete({ timeout: 10000 })
        });
      }

      //muteando con menciones:

      message.mentions.members.forEach(async (user)=>{

        if (!user) return message.reply("menciona a quien o quienes quieres mutear.");

        //if (user.roles.cache.has(muterole)) return message.reply(`${user} ya está muteado.`); detectar si esta muteado.

        if (!user.voice.channel) return message.reply(`${user} no está en ningún voice.`);

        if (user.voice.channel.id != message.member.voice.channel.id) return message.reply(`${user} no está en el mismo voice que tu.`);

        user.voice.setMute(false);
        
        await message.channel.send(`${user}, te acaba de desmutear ${message.author}.`);

      });

    }
    else {
      message.reply('No estas en ningun canal de voz.');
    }
	}
};