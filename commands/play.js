const yts = require('yt-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const { prefix } = require("../config.json");
const { reproducir, no_voice, no_permisos, canal_musica, cancion_agregada } = require("../frases.json");

module.exports = {
	name: 'play',
    description: 'Poner musica',
    async execute(client, message, args) {

        if (message.author.bot){
            return;
        } 

        if(!message.member.voice.channel){
            //elegir frase de no voice al azar
            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
            return message.reply(novoice);
        }

        if (message.channel.id === '703314121801859184' || message.channel.id === '379443661290733571' || message.channel.id === '719346636714803271') {

            const voiceChannel = message.member.voice.channel;
            const permisos = voiceChannel.permissionsFor(message.client.user);

            if (!voiceChannel){
                //elegir frase de no voice al azar
                var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                return message.reply(novoice);
            }

            if (!permisos.has("CONNECT") || !permisos.has("SPEAK")) {
                //elegir frase de no permisos al azar
                var nopermisos = no_permisos[Math.floor(Math.random() * no_permisos.length)];
                return message.reply(nopermisos);
            }
            if(!args.length){

                message.reply("Puedes usar un link de youtube o decirme que canción buscar. \n\r`"+prefix+"play link|canción`.");
            
            }

            else if(args.length >= 0){

                const targetsong = args.join(' ');
                const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
                const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;

                if(videoPattern.test(args[0])){

                    //Video link

                    const songInfo = await ytdl.getInfo(args[0], 1);
                    const song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                    autor: songInfo.author.name
                    };

                    var repro = reproducir[Math.floor(Math.random() * reproducir.length)];

                    const playEmbed = new Discord.MessageEmbed()
                    .setColor("#8b3dbd")
                    .setTitle(repro)
                    .setDescription(`[${song.title}](${song.url}) \n**Autor:** ${song.autor}`);

                    message.channel.send(playEmbed).then(sentMessage => {
                        sentMessage.react('⏪')
                        .then(() => sentMessage.react('⏯'))
                        .then(() => sentMessage.react('⏩'))
                        .catch(() => console.error('One of the emojis failed to react.'));
                    });

                    delete require.cache['../frases.json'];

                    voiceChannel.join().then(connection => {
                        const stream = ytdl(args[0], { filter: 'audioonly' });
                        const dispatcher = connection.play(stream);
            
                        dispatcher.on('finish', () => voiceChannel.leave());
                    });

                }

                else if (playlistPattern.test(args[0])){

                    message.reply("Aun trabajando con playlists");

                }

                else{

                    //Buscar cancion

                    yts( targetsong, function ( err, r ) {
                        if ( err ) return message.reply("No encontre ninguna cancion, intentalo otra vez.");
            
                        const videos = r.videos;

                        url = videos[0].url;
                        title = videos[0].title;
                        autor = videos[0].author.name;

                        const voiceChannel = message.member.voice.channel;
    
                        var repro = reproducir[Math.floor(Math.random() * reproducir.length)];
    
                        const playEmbed = new Discord.MessageEmbed()
                        .setColor("#8b3dbd")
                        .setTitle(repro)
                        .setDescription(`[${title}](${url}) \n**Autor:** ${autor}`);
                
                        voiceChannel.join().then(connection => {
                            const stream = ytdl(url, { filter: 'audioonly' });
                            const dispatcher = connection.play(stream);
                    
                            dispatcher.on('finish', () => voiceChannel.leave());
                        });
    
                        message.channel.send(playEmbed).then(sentMessage => {
                            sentMessage.react('⏪')
                            .then(() => sentMessage.react('⏯'))
                            .then(() => sentMessage.react('⏩'))
                            .catch(() => console.error('One of the emojis failed to react.'));
                        });

                        //borrar chache para actualizar lista de frases
                        delete require.cache['../frases.json'];
            
                    });

                }

            }
        }
        else{

            //elegir frase de canal musica al azar
            var canal = canal_musica[Math.floor(Math.random() * canal_musica.length)];

            message.channel.send(canal);
        }
	}
};
