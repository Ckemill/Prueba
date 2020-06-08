const Discord = require('discord.js');

module.exports = {
    name: "help",
    descripcion: "Todos los comandos del bot",
    execute(client, message) {

        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#8b3dbd")
        .setTitle("Como tu ere' bruto aqui te digo como usarme :v")
        .setURL('https://github.com/Ckemill/Prueba#readme')
        .addField('\u200b', '\u200b')
        .addFields(
            {name: 'play', value: 'Pongo la canción que me digas', inline: true}
        )
        .addField('\u200b', '\u200b')
        .setTimestamp(10)
        .setFooter('Bot made by Kemill', 'https://en.gravatar.com/userimage/184776942/b820bcb781c920db44ccc7bda2362843?size=200');

        message.channel.send(helpEmbed);

    }
}