const discord = require("discord.js");
const client = new discord.Client();
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
client.queue = new Map();


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
            message.reply("Mi loco eso no es un comando xd")
            return;
        }
        
        try{
            client.commands.get(command).execute(client, message, args);
        }
        catch(err) {
            console.log(err);
        }

    }

});


//Activar a Perritu:
client.login("NzAzNTIyOTE1Mzc4OTIxNTk0.Xt1KTg.Q6oy7eAgPsXvN_FR1mo_t2_Nq-U");