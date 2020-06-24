const fs = require('fs');

module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message, args, queue) {

        const { parar_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            message.reply("Tienes que estar en un voice");
        }
        else{

            try{
                var para = parar_musica[Math.floor(Math.random() * parar_musica.length)];

                const serverQueue = queue.get(message.guild.id);

                if(voiceChannel != serverQueue.voiceChannel){
                    message.reply(`No estas en el mismo voice que yo.`);
                }
                else if(!serverQueue.dispatcher){
                    message.reply(`no hay nada que parar.`)
                }
                else{
                    voiceChannel.leave();

                    message.channel.send(para);

                    queue.delete(message.guild.id);
                }
            }
            catch (err){
                voiceChannel.leave();
                message.reply('Ni siquiera estoy en un voice.');
            }
        
        }
    }
}
