const fs = require('fs');
var tts = require('google-tts-api');
const { prefix } = require("../config.json");

module.exports = {
	name: 'echo',
    description: 'I speak for you!',
	async execute(client, message, args, queue) {

        const user = message.author;

        const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        const text = args.join(' ');

        const voiceChannel = message.member.voice.channel;

        if (args.length > 0){
            
            message.reply(`Envía **\`${prefix}echo\`** y luego escribe normalmente.`);

        }

        else if (!voiceChannel){
            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
            return message.reply(novoice);
        }

        else{

            try{

                const serverQueue = queue.get(message.guild.id);

                try{

                    if (voiceChannel != serverQueue.voiceChannel){
                        message.reply(`No estas en el mismo voice que yo.`);
                    }

                    else if (serverQueue.dispatcher){
                        message.reply(`estoy tocando musica!`);
                    }

                    else{

                        message.reply('emmm...');

                    }
                }
                catch{

                    message.reply(`ahora repetiré todo lo que escribas en el voice! \n*Escribe **\`stop\`** para dejar de copiarte.*`);
                    
                    const connection = voiceChannel.join()

                    eco(message ,user, voiceChannel, connection);

                }

            }
            catch(err){

                console.log(err);

            }
        }

	}
};

function eco(message, user, voiceChannel, voz){

    try {

        message.channel.awaitMessages(m => m.author.id == user,
            {max: 1, time: 60000}).then(collected => {

                if (collected.first().content.toLowerCase() == 'stop'){

                    message.reply(`vale, dejaré de copiarte.`);
                    voiceChannel.leave();

                }

                if (collected.first().content.toLowerCase().startsWith(`${prefix}play`)){
                    message.reply(`no puedo copiar mientras pongo musica.`);
                    return;
                }

                else{

                    tts(collected.first().content, 'es-US', 1)
                    .then(function (url) {

                        voz.then((connection) => {
                            connection.voice.setSelfDeaf(true);
                            connection.play(url).on('end', () => {
                                connection.disconnect();
                            }).on('error', (err) => {
                                console.error(err);
                                connection.disconnect();
                            });
                        }).catch((err) => {
                            console.error(err);
                        });
                    })
                    .catch(function (err) {
                        console.error(err.stack);
                    });
                    eco(message, user, voiceChannel, voz);

                }

            })
            .catch(() => {
                message.reply(`no haz escrito nada en 1 minuto, dejaré de copiarte.`);
                voiceChannel.leave();
            })
        
    } catch (error) {
        console.log(error);
    }

}