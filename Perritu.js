const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const { readdirSync } = require("fs");
const { join } = require ("path");
const { prefix } = require("./config.json");


const queue = new Map();

//Eventos de Perritu:
client.on("ready", () => {
    console.log("Coleando!");
    
    client.user.setActivity('ser un gato', { type: 'PLAYING' });

    const canales = client.channels.cache;
    
    /*canales.forEach(channels => {
        if(channels.type == "text"){
            channels.send('creo que me quedaré');
        }
    });*/
    
});

client.on("up", () => {

    console.log('Ya desperté!');

    const canales = client.channels.cache;
    
    canales.forEach(channels => {
        if(channels.type == "text"){
            channels.send('He vuelto! :dog:');
        }
    });

});

client.on("down", () => {

    console.log('apagando bot');

    const canales = client.channels.cache;
    
    canales.forEach(channels => {
        if(channels.type == "text"){
            channels.send('Creo que me quedaré dormido.');
        }
    });

});

client.on("warn", info => console.log(info));

client.on("error", console.error);


//Declaraciones:
client.commands = new discord.Collection();
client.prefix = prefix;


//Cargar archivos:
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of cmdFiles) {
    const command = require(join(__dirname, "commands", file));
    client.commands.set(command.name, command);
}


//Evento de mensajes:
client.on('message', message => {

    if (message.author.bot) return;
    if (!message.guild) return;

    //Si escriben un comando:
    if(message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const serverQueue = queue.get(message.guild.id);

        if(!client.commands.has(command)){
            
            const { comando_inexistente } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

            //elegir frase de error al azar
            var error = comando_inexistente[Math.floor(Math.random() * comando_inexistente.length)];

            //responder error en comando
            message.reply(error);

            return;
        }
        
        try{
            client.commands.get(command).execute(client, message, args, queue, serverQueue);
        }
        catch(err) {
            console.log(err);
        }

    }
    if(message.content === 'help') {
        message.reply(`Recuerda usar **${prefix}** antes de un comando :3`);
    }

});

client.on('messageReactionAdd', (reaction, user) => {
    if(!user.bot){
        const emoji = reaction._emoji;
        var voiceChannel = reaction.message.member.voice.channel;

        const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        try {

            const serverQueue = queue.get(reaction.message.guild.id);

            if(serverQueue){

                try {

                    if(serverQueue.reaction.id === reaction.message.id){

                        if (!voiceChannel){
                            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                            return reaction.message.channel.send(novoice);
                        }
                        
                        else if (voiceChannel != serverQueue.voiceChannel){
                            reaction.message.channel.send(`${user} no estas en el mismo voice que yo.`)
                            .then(msg => {
                                msg.delete({ timeout: 10000 })
                            })
                            .catch(console.error);
                        }

                        else if (!serverQueue.dispatcher){
                            reaction.message.channel.send(`${user} no hay nada sonando.`)
                            .then(msg => {
                                msg.delete({ timeout: 10000 })
                            })
                            .catch(console.error);
                        }

                        else{

                            if(emoji.name == '⏯'){
                                serverQueue.dispatcher.pause();
                                reaction.message.channel.send(`${user} pausó la musica.`)
                                .then(msg => {
                                    msg.delete({ timeout: 10000 })
                                })
                                .catch(console.error);
                            }
                            else if(emoji.name == '⏹'){
                                voiceChannel.leave();
                                reaction.message.delete();
                                queue.delete(reaction.message.guild.id);
                                reaction.message.channel.send(`${user} paró la música.`)
                                .then(msg => {
                                    msg.delete({ timeout: 10000 })
                                })
                                .catch(console.error);
                            }
                            else if(emoji.name == '⏭'){
                                if (!serverQueue.songs){
                                    reaction.message.channel.send(`${user} no hay nada que skipear.`)
                                    .then(msg => {
                                        msg.delete({ timeout: 10000 })
                                    })
                                    .catch(console.error);
                                }
                                else{
                                    try{
                                        serverQueue.dispatcher.end();
                                        reaction.message.channel.send(`${user} cambió de canción.`)
                                        .then(msg => {
                                            msg.delete({ timeout: 10000 })
                                        })
                                        .catch(console.error);
                                    }
                                    catch (err){
                                        console.log("error" +err);
                                    }
                                }
                            }

                        }
                    }

                } catch (err) {
                    console.log(err)
                    reaction.message.channel.send(`${user} ni siquiera estoy en un voice`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    if(!user.bot){
        const emoji = reaction._emoji;
        const voiceChannel = reaction.message.member.voice.channel;

        const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        try {

            const serverQueue = queue.get(reaction.message.guild.id);

            if(serverQueue){

                try {

                    if(serverQueue.reaction.id === reaction.message.id){

                        if (!voiceChannel){
                            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                            return reaction.message.channel.send(novoice);
                        }
                            
                        else if (voiceChannel != serverQueue.voiceChannel){
                            reaction.message.channel.send(`${user} no estas en el mismo voice que yo.`)
                            .then(msg => {
                                msg.delete({ timeout: 10000 })
                            })
                            .catch(console.error);
                        }

                        else if (!serverQueue.dispatcher){
                            reaction.message.channel.send(`${user} no hay nada sonando.`)
                            .then(msg => {
                                msg.delete({ timeout: 10000 })
                            })
                            .catch(console.error);
                        }

                        else{

                            if(emoji.name == '⏯'){
                                serverQueue.dispatcher.resume();
                                reaction.message.channel.send(`${user} reanudó la musica.`)
                                .then(msg => {
                                    msg.delete({ timeout: 10000 })
                                })
                                .catch(console.error);
                            }

                        }
                    }

                } catch {
                    reaction.message.reply(`${user} ni siquiera estoy en un voice`)
                    .then(msg => {
                        msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
});

//Activar a Perritu:
client.login(process.env.BOT_TOKEN);
