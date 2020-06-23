const fs = require('fs');
const { VoiceChannel } = require('discord.js');

module.exports = {
	name: 'skip',
    description: 'Hablar con perritu',
	async execute(client, message, args, queue) {

        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel){
            message.reply('tienes que estar en un voice.');
        }

        else{
            try{
                const serverQueue = queue.get(message.guild.id);

                try{
                    voiceBot = serverQueue.voiceChannel;

                    if (voiceChannel != serverQueue.voiceChannel){
                        message.reply(`No estas en el mismo voice que yo.`);
                    }
        
                    else if (!serverQueue.songs){
                        message.reply(`no hay nada que skipear.`);
                    }
        
                    else{
                        try{
        
                            serverQueue.dispatcher.end();

                        }
                        catch (err){
                            console.log("error" +err);
                        }
                    }

                }
                catch{
                    message.reply(`ni siquiera estoy en un voice.`);
                }

            }
            catch(err){
                console.log(err);
            }
        }
	}
};