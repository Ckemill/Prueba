const fs = require('fs');

module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message) {
		
	const { parar_musica } = JSON.parse(fs.readFileSync('../frases.json', 'utf8'));

        const { parar_musica } = JSON.parse(fs.readFileSync('../frases.json', 'utf8'));

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            message.reply("Tienes que estar en un voice");
        }

        try{
            var para = parar_musica[Math.floor(Math.random() * parar_musica.length)];

            voiceChannel.leave();

            message.channel.send(para);

            return;
        }
        catch (err){
            console.log("error" +err);
        }
        

    }
}
