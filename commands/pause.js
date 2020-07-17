const fs = require('fs');

module.exports = {
	name: 'pause',
    description: 'Hablar con perritu',
	async execute(client, message, args, queue) {

        const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
            return message.reply(novoice);
        }

        try{

            const serverQueue = queue.get(message.guild.id);

            try{

                if (voiceChannel != serverQueue.voiceChannel){
                    message.reply(`No estas en el mismo voice que yo.`);
                }

                else if (!serverQueue.dispatcher){
                    message.reply(`no hay nada para pausar.`);
                }

                else{

                    serverQueue.dispatcher.pause();
                    message.reply('musica pausada.')
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                    return;

                }
            }
            catch{
                message.reply('ni siquiera estoy en un voice');
            }

        }
        catch(err){

            console.log(err);

        }
	}
};