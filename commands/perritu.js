
module.exports = {
	name: 'test',
    description: 'test command',
	async execute(client, message, args) {

		message.channel.send('Hello.').then(sentMessage => {

			message.reply(`deleting message.`).then( () => {
				sentMessage.delete();
			});

		});

	}
};