const { parar_musica } = require("../frases.json");

module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message) {

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            message.reply("Tienes que estar en un voice");
        }

        try{
            var para = parar_musica[Math.floor(Math.random() * parar_musica.length)];

            voiceChannel.leave();
            message.channel.send(para);
        }
        catch (err){
            console.log("error" +err);
        }
        

    }
}