const Discord = require('discord.js');

module.exports = {
	name: 'queue',
    description: 'Hablar con perritu',
	async execute(client, message, args, queue) {

        try{

            const serverQueue = queue.get(message.guild.id);

            const canciones = serverQueue.songs;

            const titulos = [];

            for (var i = 0; i < canciones.length; i++) {
                titulos.push(i+") **["+canciones[i].title+"]("+canciones[i].url+")**");
            }

            const lista = titulos.join("\n\n");

            const colaEmbed = new Discord.MessageEmbed()
            .setColor("#8b3dbd")
            .setTitle('**Cola:**')
            .setDescription(`${lista}`);

            message.channel.send(colaEmbed);

        }
        catch(err){
            message.reply('no hay cola de canciones.');
        }

	}
};