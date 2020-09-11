const { User } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: 'unmute',
    description: 'mute all on voice',
	async execute(client, message, args) {

    if (!args.length) {
      if (!message.member.voice.serverMute) return message.reply(`ya estás desmuteado.`);
      message.member.voice.setMute(false);
      return message.reply(`ya te desmutee.`).then(msg => {msg.delete({ timeout: 10000 })})
    }

    if (!message.member.permissions.has('MUTE_MEMBERS')) return message.reply(`No tienes permisos para desmutear a otros.`);

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.reply("No tengo permisos para desmutear a otros.");
    
    if (message.member.voice.channel) {

      if(args.length == '1' && args.join().toLowerCase()=='all'){
            
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      
        const users = [];

        for (const [memberID, member] of channel.members) {
          if(member.voice.serverMute){
            member.voice.setMute(false);
            users.push(member);
          }
        }
        message.channel.send(`Desmuteando a ${users.join(', ')}.`)
        .then(msg => {
          msg.delete({ timeout: 10000 })
        });
      }

      if (args.length >= 1 && !message.mentions.members.first() && args.join().toLowerCase()!='all') {
        return message.channel.send(`Para desmutearte a ti mismo solo pon **${prefix}unmute**.\nPuedes desmutear mencionando a quienes o a todos con **${prefix}unmute all**. \nEjemplo: \`${prefix}unmute @${message.author.username}\`.`);
      }

      //muteando con menciones:

      message.mentions.members.forEach(async (user)=>{

        if (!user) return message.reply("menciona a quien o quienes quieres mutear.");

        if (user.id === message.author.id) return message.reply(`para demutearte a ti mismo no tienes que mencionarte.`);

        if (!user.voice.serverMute && user.voice.selfMute) return message.reply(`${user} se muteo el mismo, no puedo desmutearlo.`);

        if (!user.voice.serverMute) return message.reply(`${user} ya estába desmuteado.`);

        if (!user.voice.channel) return message.reply(`${user} no está en ningún voice.`);

        if (user.voice.channel.id != message.member.voice.channel.id) return message.reply(`${user} no está en el mismo voice que tu.`);

        user.voice.setMute(false);
        
        await message.channel.send(`${user}, te acaba de desmutear ${message.author}.`).then(msg => {msg.delete({ timeout: 10000 })});

      });

    }
    else {
      message.reply('No estas en ningun canal de voz.');
    }
	}
};