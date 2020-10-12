const fs = require('fs');
const ytpl = require('ytpl');
const ytsr = require('ytsr');
const yts = require('youtube-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const fb = require("fb-video-downloader");
const { prefix } = require("../config.json");
const { promises } = require('dns');
const { type } = require('os');
const api = process.env.YT_API;

module.exports = {
	name: 'play',
    description: 'Poner musica',
    async execute(client, message, args, queue, serverQueue) {

        const user = message.author;
	    
	    const { reproducir, no_voice, no_permisos, canal_musica, cancion_agregada, parar_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        if (message.author.bot){
            return;
        } 

        if(!message.member.voice.channel){
            //elegir frase de no voice al azar
            var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
            message.reply(novoice)
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }

            const voiceChannel = message.member.voice.channel;
            const permisos = voiceChannel.permissionsFor(message.client.user);

            if (!voiceChannel){
                //elegir frase de no voice al azar
                var novoice = no_voice[Math.floor(Math.random() * no_voice.length)];
                message.reply(novoice)
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                .catch(console.error);
                return
            }

            if (!permisos.has("CONNECT") || !permisos.has("SPEAK")) {
                //elegir frase de no permisos al azar
                var nopermisos = no_permisos[Math.floor(Math.random() * no_permisos.length)];
                message.reply(nopermisos)
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                .catch(console.error);
                return
            }
            if(!args.length){

                message.reply("Puedes usar un link de youtube/facebook o decirme que canción buscar. \n\r`"+prefix+"play link|canción`.")
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                .catch(console.error);
                return
            
            }

            else if(args.length >= 0){

                const targetsong = args.join(' ');
                const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
                const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
                const facebookPattern = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig;

                if(facebookPattern.test(args[0])){

                    //Facebook

                    const video = await fb.getInfo(targetsong);

                    const song = {
                        title: video.title,
                        url: video.download.sd,
                        usuario: user
                    };

                    if(!serverQueue){

                        const queueConstruct = {
                            textChannel: message.channel,
                            voiceChannel: voiceChannel,
                            connection: null,
                            dispatcher: null,
                            reaction: null,
                            songs: [],
                            playing: true
                        }

                        queue.set(message.guild.id, queueConstruct);

                        queueConstruct.songs.push(song);

                        try {
                            
                            const connection = voiceChannel.join();

                            queueConstruct.connection = connection;

                            reprod(message.guild, queueConstruct, reproducir, queue, serverQueue);

                        }
                        catch (error) {
                            
                            console.log(error);

                            queue.delete(message.guild.id);

                        }

                    }
                    else{

                        serverQueue.songs.push(song);

                        message.channel.send(`agregué **${song.title}** a la cola.`)
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        })
                        .catch(console.error);

                    }

                }

                else if(playlistPattern.test(args[0])){

                    //Playlist link

                    if(!serverQueue){
                        message.reply('pon cualquier cancion antes de agregar una playlist. \n(*estoy trabajando para solucionar esto.*)')
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        })
                        .catch(console.error);
                        return;
                    }

                    else{

                        opts = {
                            limit: 0
                        }

                        var playlist;

                        const listEmbed = new Discord.MessageEmbed();

                        var lista;

                        const canciones = [];

                        ytpl(args[0], opts, function(err, info) {
                            if(err) throw err;

                            playlist = {
                                title: info.title,
                                url: info.url,
                                canciones: info.total_items,
                                autor: info.author.name,
                                avatar: info.author.avatar,
                                canal: info.author.channel_url
                            }

                            listEmbed
                            .setColor("#8b3dbd")
                            .setTitle(playlist.title)
                            .setDescription(`Agregando **${playlist.canciones}** canciones.`)
                            .setAuthor(playlist.autor, playlist.avatar, playlist.canal)
                            .setURL(playlist.url);

                            message.channel.send(listEmbed);

                            lista = info.items;

                            for (var i = 0; i < lista.length; i++) {
                                canciones.push(lista[i].url_simple);
                            }

                            for (var i = 0; i < canciones.length; i++){

                                ytdl.getInfo(canciones[i], function(err, info){
                                    if(err) throw err;

                                    const songInfo = info;
            
                                    const song = {
                                        title: songInfo.title,
                                        url: songInfo.video_url,
                                        autor: songInfo.author.name,
                                        usuario: user
                                    };
            
                                    if (!serverQueue){
            
                                        /*const queueConstruct = {
            
                                            textChannel: message.channel,
                                            voiceChannel: voiceChannel,
                                            connection: null,
                                            dispatcher: null,
                                            reaction: null,
                                            songs: [],
                                            playing: true
            
                                        }
            
                                        queue.set(message.guild.id, queueConstruct);
            
                                        queueConstruct.songs.push(song);
            
                                        try {
                                                
                                            const connection = voiceChannel.join();
            
                                            queueConstruct.connection = connection;
            
                                            reprod(message.guild, queueConstruct, repro, queue, serverQueue);
            
                                        }
                                        catch (error) {
            
                                            console.log(error);
            
                                            queue.delete(message.guild.id);
                                                
                                        }*/
            
                                    }
                                    else{
            
                                        serverQueue.songs.push(song);
            
                                        //message.channel.send(`${i}) agregué **${song.title}** a la cola.`);
            
                                    }

                                });
        
                            }

                        });

                    }

                }

                else if(videoPattern.test(args[0])){

                    //Video link

                    const songInfo = await ytdl.getInfo(args[0], 1);

                    const song = {
                        title: songInfo.title,
                        url: songInfo.video_url,
                        autor: songInfo.author.name,
                        usuario: user
                    };

                    if (!serverQueue){

                        const queueConstruct = {

                            textChannel: message.channel,
                            voiceChannel: voiceChannel,
                            connection: null,
                            dispatcher: null,
                            reaction: null,
                            songs: [],
                            playing: true

                        }

                        queue.set(message.guild.id, queueConstruct);

                        queueConstruct.songs.push(song);

                        try {
                            
                            const connection = voiceChannel.join();

                            queueConstruct.connection = connection;

                            reprod(message.guild, queueConstruct, reproducir, queue, serverQueue);

                        }
                        catch (error) {

                            console.log(error);

                            queue.delete(message.guild.id);
                            
                        }

                    }
                    else{

                        serverQueue.songs.push(song);

                        message.channel.send(`agregué **${song.title}** a la cola.`)
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        })
                        .catch(console.error);

                    }

                }

                else{

                    //Buscar cancion

                    const options = {
                        maxResults: 1,
                        key: api,
                        type: 'video'
                    }

                    try{
                        await yts(targetsong, options, async function(err, result) {

                            if(err){
                                message.reply("no encontre ninguna canción, intentalo otra vez.");
                                return console.log(err);
                            }

                            else{

                                const videos = result[0];

                                const video = {
                                    title: videos.title,
                                    url: videos.link,
                                    autor: videos.channelTitle,
                                    img: videos.thumbnails.high.url,
                                    usuario: user
                                };

                                const voiceChannel = message.member.voice.channel;

                                if (!serverQueue){

                                    const queueConstruct = {
                                        textChannel: message.channel,
                                        voiceChannel: voiceChannel,
                                        connection: null,
                                        dispatcher: null,
                                        reaction: null,
                                        songs: [],
                                        playing: true
                                    };

                                    queue.set(message.guild.id, queueConstruct);

                                    queueConstruct.songs.push(video);

                                    try{

                                        const connection = voiceChannel.join();

                                        queueConstruct.connection = connection;

                                        reprod(message.guild, queueConstruct, reproducir, queue, serverQueue);

                                    }
                                    catch (err){

                                        console.log(err);

                                        queue.delete(message.guild.id);

                                    }

                                }
                                else{

                                    serverQueue.songs.push(video);

                                    message.channel.send(`agregué **${video.title}** a la cola.`)
                                    .then(msg => {
                                        msg.delete({ timeout: 10000 })
                                    })
                                    .catch(console.error);

                                }
                            }
                
                        });
                    }
                    catch(err){
                        console.log(err);
                        message.reply('Llamen a Kemill porque no conozco este error... :s')
                        .then(msg => {
                            msg.delete({ timeout: 10000 })
                        })
                        .catch(console.error);
                        return;
                    }

                }

            }
	}
};

function reprod(guild, construct, repro, queue, serverQueue) {

    const { reproducir } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

    var msg = reproducir[Math.floor(Math.random() * reproducir.length)];

    serverQueue = queue.get(guild.id);

    const playEmbed = new Discord.MessageEmbed();

    var song = construct.songs[0];

    var stream;

    try {
        
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            serverQueue.textChannel.send(`Se acabo la musica.`)
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return;
        }
        else{

            if(typeof song.autor === "undefined"){

                stream = song.url;

                playEmbed
                .setColor("#8b3dbd")
                .setTitle(msg)
                .setDescription(`**Video de: [${song.title}](${song.url})** \n**Puesta por:** ${song.usuario}`);
            }

            else if(typeof song.img === "undefined"){

                stream = ytdl(song.url, { filter: 'audioonly', quality: "highestaudio" });

                playEmbed
                .setColor("#8b3dbd")
                .setTitle(msg)
                .setDescription(`[${song.title}](${song.url}) \n**Autor:** ${song.autor} \n**Puesta por:** ${song.usuario}`);
            }

            else if(song.img){

                stream = ytdl(song.url, { filter: 'audioonly', quality: "highestaudio" });

                playEmbed
                .setColor("#8b3dbd")
                .setTitle(msg)
                .setThumbnail(song.img)
                .setDescription(`**[${song.title}](${song.url})** \n**Autor:** ${song.autor} \n**Puesta por:** ${song.usuario}`);
            }
            serverQueue.textChannel.send(playEmbed).then(sentMessage => {
                construct.reaction = sentMessage;
                sentMessage.react('⏹')
                .then(() => sentMessage.react('⏯'))
                .then(() => sentMessage.react('⏭'))
                .catch(() => console.error('One of the emojis failed to react.'))

                const connection = serverQueue.connection
                connection.then(connection => {
                    connection.voice.setSelfDeaf(true);

                    const dispatcher = connection.play(stream, { volume: 0.25 });

                    construct.dispatcher = dispatcher;
                    
                    dispatcher.on('finish', () => {
                        
                        serverQueue.songs.shift();

                        sentMessage.delete();

                        reprod(guild, construct, msg, queue, serverQueue);

                    });
                    dispatcher.on("error", error => {
                        console.error(error);
                        console.log(error);
                    });
                });

            });
        }

    }
    catch (error) {
        console.log(error);
        return;
    }

}