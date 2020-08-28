const { User } = require("discord.js");

module.exports = {
  name: 'mute',
    description: 'mute all on voice',
	async execute(client, message, args) {
    
    if (message.member.voice.channel) {
            
      let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      
      const users = [];

      for (const [memberID, member] of channel.members) {
        member.voice.setMute(true);
        users.push(member);
      }
      message.channel.send(`Muteando a ${users.join(', ')}.`)
      .then(msg => {
        msg.delete({ timeout: 10000 })
      });
    } else {
      message.reply('No estas en ningun canal de voz.');
    }
	}
};