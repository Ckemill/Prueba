const fs = require("fs");
const Discord = require('discord.js');
const fecha = new Date('2020-06-01');
const { prefix } = require("../config.json");

module.exports = {
    name: "help",
    descripcion: "Todos los comandos del bot",
    execute(client, message) {

        const { ayuda } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        var ayu = ayuda[Math.floor(Math.random() * ayuda.length)];

        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#8b3dbd")
        .setTitle(ayu)
        .addFields(
            {name: '**'+prefix+'play**', value: 'Busco una canción en youtube y la reproduzco. \n*(también acepto links de Facebook y Youtube.)*', inline: true},
            {name: '**'+prefix+'pause**', value: "Pauso la musica.", inline: false},
            {name: '**'+prefix+'resume**', value: "Reanudo la musica.", inline: false},
            {name: '**'+prefix+'stop**', value: "Detengo la musica y salgo de la llamada.", inline: false},
            {name: '**'+prefix+'queue**', value: "Muestro la lista de musicas en cola.", inline: false},
            {name: '**'+prefix+'skip**', value: "Paso a la siguiente cancion de la cola. \n*(Si no hay una siguiente canción hago lo mismo que **"+prefix+"stop**.)*", inline: false},
            {name: '**'+prefix+'echo**', value: "Digo lo que escribes en el voice.", inline: false},
            {name: '**'+prefix+'frase**', value: "Agrega frases para mis comandos. \n*(Usa **"+prefix+"frase** para ver como usarlo.)*", inline: false}
        )
        .setTimestamp(fecha)
        .addField("\u200b",'**¡Visita mi página! https://perritu.net **')
        .setFooter('Bot made by Ckemill', 'https://en.gravatar.com/userimage/184776942/b820bcb781c920db44ccc7bda2362843?size=200');

        message.channel.send(helpEmbed);

    }
};