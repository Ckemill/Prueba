const { User } = require("discord.js");

module.exports = {
	name: 'mute',
    description: 'mute all on voice',
	async execute(client, message, args) {

        if (message.member.voice.channel) {
            
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members) {
              member.voice.setMute(true);
            }
          } else {
            message.reply('No estas en ningun canal de voz.');
          }

	}
};