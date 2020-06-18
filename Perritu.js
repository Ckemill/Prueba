const discord = require("discord.js");
const client = new discord.Client();
const fs = require('fs');
const { readdirSync } = require("fs");
const { join } = require ("path");
const { prefix } = require("./config.json");

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

        if(!client.commands.has(command)){
            
            const { comando_inexistente } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

            //elegir frase de error al azar
            var error = comando_inexistente[Math.floor(Math.random() * comando_inexistente.length)];

            //responder error en comando
            message.reply(error);

            return;
        }
        
        try{
            client.commands.get(command).execute(client, message, args);
        }
        catch(err) {
            console.log(err);
        }

    }
    if(message.content === 'help') {
        message.reply(`Recuerda usar **${prefix}** antes de un comando :3`);
    }

});

//Activar a Perritu:
client.login(process.env.BOT_TOKEN);