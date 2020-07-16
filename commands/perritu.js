const db = require('../database');

module.exports = {
	name: 'test',
    description: 'test command',
	async execute(client, message, args) {

		var id = message.channel.id;
		var name = message.guild.name;

		db.query(`UPDATE wp_servers_discord SET name = "${name}" WHERE ID = ${id}`, { type: db.QueryTypes.UPDATE })
		.then( () => {
			console.log('Success');
		})
		.catch((err) => {
			console.log(err);
		});

		db.query('SELECT * FROM wp_servers_discord', { type: db.QueryTypes.SELECT })
		.then(function(users) {

			for (var i = 0; i < users.length; i++) {
				console.log(users[i].ID);
			}

		});

		/*message.channel.send('Hello.').then(sentMessage => {

			message.reply(`deleting message.`).then( () => {
				sentMessage.delete();
			});

		});*/

	}
};