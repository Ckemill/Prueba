const fs = require("fs");
const Discord = require('discord.js');
const fecha = new Date('2020-06-01');

module.exports = {
    name: "help",
    descripcion: "Todos los comandos del bot",
    execute(client, message) {

        const { ayuda } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        var ayu = ayuda[Math.floor(Math.random() * ayuda.length)];

        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#8b3dbd")
        .setTitle(ayu)
        .setURL('https://github.com/Ckemill/Prueba#readme')
        .addField('\u200b')
        .addFields(
            {name: '**play**', value: 'Busco una canción en youtube y la reproduzco. \n*(también acepto links de Facebook y Youtube)*', inline: true},
            {name: '**stop**', value: "Detengo la musica y salgo de la llamada. \n*(Debes estar en un voice para usarlo)*", inline: false},
            {name: '**frase**', value: "Agrega frases para mis comandos. \n*(Usa **_frase** para ver como usarlo)*", inline: false}
        )
        .addField('\u200b')
        .setTimestamp(fecha)
        .setFooter('Bot made by Kémill', 'https://en.gravatar.com/userimage/184776942/b820bcb781c920db44ccc7bda2362843?size=200');

        message.channel.send(helpEmbed);

    }
};