module.exports = {
	name: 'test',
    description: 'test command',
	async execute(client, message, args) {

		message.channel.send('hola.').then(sentMessage => {

			message.reply(`deleting message.`).then( () => {
				sentMessage.delete();
			});

		});

	}
};