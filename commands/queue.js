const Discord = require('discord.js');

module.exports = {
	name: 'queue',
    description: 'Hablar con perritu',
	async execute(client, message, args, queue) {

        try{

            const serverQueue = queue.get(message.guild.id);

            const canciones = serverQueue.songs;

            let paginaActual = 0;
            const embeds = generateQueueEmbed(canciones);
            const queueEmbed = await message.channel.send(`Página: ${paginaActual+1} de ${embeds.length}`, embeds[paginaActual]);
            await queueEmbed.react('⬅️');
            await queueEmbed.react('➡️');
            await queueEmbed.react('⏏️');

            const filter = (reaction, user) => ['⬅️', '➡️', '⏏️'].includes(reaction.emoji.name) && (message.author.id == user.id);
            const collector = queueEmbed.createReactionCollector(filter);

            collector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === '➡️'){
                    if (paginaActual < embeds.length-1) {
                        paginaActual++;
                        queueEmbed.edit(`Página: ${paginaActual+1} de ${embeds.length}`, embeds[paginaActual]);
                    }
                }
                else if (reaction.emoji.name === '⬅️'){
                    if (paginaActual !== 0) {
                        --paginaActual;
                        queueEmbed.edit(`Página: ${paginaActual+1} de ${embeds.length}`, embeds[paginaActual]);
                    }
                }
                else{
                   collector.stop();
                   await queueEmbed.delete(); 
                   message.channel.send(`${user} quitó la lista de canciones.`)
                   .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
            });

        }
        catch(err){
            message.reply('no hay cola de canciones.');
        }

	}
}

function generateQueueEmbed(queue) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < queue.length; i += 10){
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(track => `${++j}) [${track.title}](${track.url})`).join('\n');
        const embed = new Discord.MessageEmbed()
            .setDescription(`**${info}**`);
        embeds.push(embed);
    }
    return embeds;
}