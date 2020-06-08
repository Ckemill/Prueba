module.exports = {
	name: 'play',
	description: 'Poner musica',
	execute(client, message, args) {

        if (message.channel.id === '703314121801859184' || message.channel.id === '379443661290733571') {

            message.channel.send("`Aún en desarrollo.`").then(sentMessage => {
                sentMessage.react('⏪')
			    .then(() => sentMessage.react('⏯'))
			    .then(() => sentMessage.react('⏩'))
			    .catch(() => console.error('One of the emojis failed to react.'));
            });
            
        }

        else{
            message.channel.send('Por favor usa el canal de **musica**.');
        }
		
	}
};