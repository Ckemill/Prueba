const discord = require("discord.js");
const client = new discord.Client();
const fs = require('fs');
const { readdirSync } = require("fs");
const { join } = require ("path");
const { prefix } = require("./config.json");

const queue = new Map();

//Eventos de Perritu:
client.on("ready", () => {
    console.log("Coleando!");
    
    client.user.setActivity('ser un gato', { type: 'PLAYING' });
    
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
        const voiceChannel = reaction.message.member.voice.channel;

        const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        try {

            const serverQueue = queue.get(reaction.message.guild.id);

            if(serverQueue){

                try {

                    if(serverQueue.reaction === reaction.message.id){

                        if (!voiceChannel){
                            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                            return reaction.message.reply(novoice);
                        }
                        
                        else if (voiceChannel != serverQueue.voiceChannel){
                            reaction.message.reply(`No estas en el mismo voice que yo.`);
                        }

                        else if (!serverQueue.dispatcher){
                            reaction.message.reply(`no hay nada sonando.`);
                        }

                        else{

                            if(emoji.name == '⏯'){
                                serverQueue.dispatcher.pause();
                            }
                            else if(emoji.name == '⏹'){
                                voiceChannel.leave();
                                reaction.message.delete();
                                queue.delete(reaction.message.guild.id);
                            }
                            else if(emoji.name == '⏭'){
                                if (!serverQueue.songs){
                                    message.reply(`no hay nada que skipear.`);
                                }
                                else{
                                    try{
                                        serverQueue.dispatcher.end();
                                    }
                                    catch (err){
                                        console.log("error" +err);
                                    }
                                }
                            }

                        }
                    }

                } catch {
                    reaction.message.reply('ni siquiera estoy en un voice');
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

                    if(serverQueue.reaction === reaction.message.id){

                        if (!voiceChannel){
                            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                            return reaction.message.reply(novoice);
                        }
                            
                        else if (voiceChannel != serverQueue.voiceChannel){
                            reaction.message.reply(`No estas en el mismo voice que yo.`);
                        }

                        else if (!serverQueue.dispatcher){
                            reaction.message.reply(`no hay nada sonando.`);
                        }

                        else{

                            if(emoji.name == '⏯'){
                                serverQueue.dispatcher.resume();
                            }

                        }
                    }

                } catch {
                    reaction.message.reply('ni siquiera estoy en un voice');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
});

//Activar a Perritu:
client.login(process.env.BOT_TOKEN);
