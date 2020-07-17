const fs = require('fs');

module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message, args, queue) {

        const { parar_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        const voiceChannel = message.member.voice.channel;

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
                    message.reply(`No estoy en ningun voice.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }

                if(voiceChannel != serverQueue.voiceChannel){
                    message.reply(`No estas en el mismo voice que yo.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
                else if(!serverQueue.dispatcher){
                    message.reply(`no hay nada que parar.`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
                else{
                    voiceChannel.leave();

                    serverQueue.reaction.delete();

                    message.channel.send(para)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);

                    queue.delete(message.guild.id);
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
