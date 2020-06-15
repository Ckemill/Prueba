const yts = require('yt-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const { prefix } = require("../config.json");
const { reproducir, no_voice, no_permisos, canal_musica, cancion_agregada } = require("../frases.json");

module.exports = {
	name: 'play',
    description: 'Poner musica',
    execute(client, message, args) {

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

                    const songInfo = ytdl.getInfo(args[0]);
                    const song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                    };

                    var repro = reproducir[Math.floor(Math.random() * reproducir.length)];

                    const playEmbed = new Discord.MessageEmbed()
                    .setColor("#8b3dbd")
                    .setTitle(repro)
                    .setDescription(`[${song.title}](${song.url})`);

                    message.channel.send(playEmbed).then(sentMessage => {
                        sentMessage.react('⏪')
                        .then(() => sentMessage.react('⏯'))
                        .then(() => sentMessage.react('⏩'))
                        .catch(() => console.error('One of the emojis failed to react.'));
                    });

                    voiceChannel.join().then(connection => {
                        const stream = ytdl(args[0], { filter: 'audioonly' });
                        const dispatcher = connection.play(stream);
            
                        dispatcher.on('end', () => voiceChannel.leave());
                    });

                }

                else if (playlistPattern.test(args[0])){

                    message.reply("Aun trabajando con playlists");

                }

                else{

                    //Buscar cancion

                    yts( targetsong, function ( err, r ) {
                        if ( err ) throw err;
            
                        const videos = r.videos;

                        url = videos[0].url;
                        title = videos[0].title;
                        autor = videos[0].author.name;

                        if(!url){
                            message.reply("No encontre ninguna cancion, intentalo otra vez");
                        }

                        else{

                            const voiceChannel = message.member.voice.channel;
    
                            var repro = reproducir[Math.floor(Math.random() * reproducir.length)];
    
                            const playEmbed = new Discord.MessageEmbed()
                            .setColor("#8b3dbd")
                            .setTitle(repro)
                            .setDescription(`[${title}](${url}) \nAutor: ${autor}`);
                
                            voiceChannel.join().then(connection => {
                                const stream = ytdl(url, { filter: 'audioonly' });
                                const dispatcher = connection.play(stream);
                    
                                dispatcher.on('end', () => voiceChannel.leave());
                            });
    
                            message.channel.send(playEmbed).then(sentMessage => {
                                sentMessage.react('⏪')
                                .then(() => sentMessage.react('⏯'))
                                .then(() => sentMessage.react('⏩'))
                                .catch(() => console.error('One of the emojis failed to react.'));
                            });

                        }
            
                    });

                }

                /*const songInfo = await ytdl.getInfo(url);
                const song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                };
                    
                    //elegir frase de no permisos al azar
                    var agregada = cancion_agregada[Math.floor(Math.random() * cancion_agregada.length)];

                    const addEmbed = new Discord.MessageEmbed()
                    .setColor("#8b3dbd")
                    .setTitle(agregada)
                    .setDescription(`[${song.title}](${song.url})`);

                    return message.channel.send(addEmbed);
                

                var reproducir = repro[Math.floor(Math.random() * repro.length)];

                const playEmbed = new Discord.MessageEmbed()
                .setColor("#8b3dbd")
                .setTitle(reproducir)
                .setDescription(`[${song.title}](${song.url})`);

                message.channel.send(playEmbed).then(sentMessage => {
                    sentMessage.react('⏪')
                    .then(() => sentMessage.react('⏯'))
                    .then(() => sentMessage.react('⏩'))
                    .catch(() => console.error('One of the emojis failed to react.'));
                });
                */
            }
        }
        else{

            //elegir frase de canal musica al azar
            var canal = canal_musica[Math.floor(Math.random() * canal_musica.length)];

            message.channel.send(canal);
        }
	}
};