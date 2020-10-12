const fs = require('fs');

module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message, args, queue) {

        const { parar_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        const volume = (args.join(' ')*1);
        const voiceChannel = message.member.voice.channel;

        if (!volume) return message.reply(`tienes que especificar con números.`);

        if (!voiceChannel){
            message.reply("Tienes que estar en un voice")
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }
        else{

            try{
                var para = parar_musica[Math.floor(Math.random() * parar_musica.length)];

                const serverQueue = queue.get(message.guild.id);

                if(!serverQueue.voiceChannel){
                    message.reply(`no estoy en ningun voice.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }

                if(voiceChannel != serverQueue.voiceChannel){
                    message.reply(`no estas en el mismo voice que yo.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
                else if(!serverQueue.dispatcher){
                    message.reply(`no hay nada a lo que cambiar el volumen.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
                else{

                    if (volume > 100 || volume < 1) return message.reply(`el volumen debe ser entre **1** y **100**%`);

                    const dispatcher = serverQueue.dispatcher;

                    await dispatcher.setVolume(Math.min(volume / 50));
                    return message.channel.send(`**Volumen:** \`${Math.round(dispatcher.volume*50)}%\``);
                }
            }
            catch (err){
                console.log(err);
                voiceChannel.leave();
                message.reply('Ni siquiera estoy en un voice.')
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                .catch(console.error);
            }
        
        }
    }
}
