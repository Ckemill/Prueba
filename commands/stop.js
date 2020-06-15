module.exports = {
	name: 'stop',
    description: 'Parar la musica',
	async execute(client, message) {

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            message.reply("Tienes que estar en un voice");
        }

        try{
            voiceChannel.leave();
        }
        catch (err){
            console.log("error" +err);
        }
        

    }
}