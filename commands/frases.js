const fs = require("fs");
const { prefix } = require("../config.json");

module.exports = {
	name: 'frase',
    description: 'Agregar frases a Perritu',
	execute(client, message, args) {

        const { frase_agregada } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

        if(!args.length) {

            fs.readFile("./frases.json", "utf-8", function(err, data) {

                if (err) throw err;
            
                const frases = JSON.parse(data);
                const lista = Object.keys(frases).join("\n");
   
                message.reply("Puedes poner una frase para estas listas: \n\r**"+lista+" ** \n\rEjemplo: `"+prefix+"frase no_voice Tienes que estar en un voice.`");

            });
        }

        if (args.length == 1){
            
            if (args[0] === "ayuda"){
                const { ayuda } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de ayuda:**\n*"+ayuda.join('\n')+"*");
            }
            else if (args[0] === "no_voice"){
                const { no_voice } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de no_voice:**\n*"+no_voice.join('\n')+"*");
            }
            else if (args[0] === "reproducir"){
                const { reproducir } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de reproducir:**\n*"+reproducir.join('\n')+"*");
            }
            else if (args[0] === "no_permisos"){
                const { no_permisos } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de no_permisos:**\n*"+no_permisos.join('\n')+"*");
            }
            else if (args[0] === "canal_musica"){
                const { canal_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de canal_musica:**\n*"+canal_musica.join('\n')+"*");
            }
            else if (args[0] === "parar_musica"){
                const { parar_musica } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de parar_musica:**\n*"+parar_musica.join('\n')+"*");
            }
            else if (args[0] === "frase_agregada"){
                const { frase_agregada } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de frase_agregada:**\n*"+frase_agregada.join('\n')+"*");
            }
            else if (args[0] === "cancion_agregada"){
                const { cancion_agregada } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de cancion_agregada:**\n*"+cancion_agregada.join('\n')+"*");
            }
            else if (args[0] === "comando_inexistente"){
                const { comando_inexistente } = JSON.parse(fs.readFileSync('./frases.json', 'utf8'));

                message.reply("**frases de comando_inexistente:**\n\n*"+comando_inexistente.join('\n\n')+"*");
            }
            else{
                message.reply(`no existe esa lista. \nUsa \`${prefix}frase\` para ver las listas de frases.`);
            }

        }

        if (args.length >= 2){
        
            if (args[0] === "ayuda"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.ayuda.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "comando_inexistente"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.comando_inexistente.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "frase_agregada"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.frase_agregada.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "reproducir"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.reproducir.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "no_voice"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.no_voice.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "no_permisos"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.no_permisos.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "canal_musica"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.canal_musica.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "cancion_agregada"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.cancion_agregada.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            if (args[0] === "parar_musica"){

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;

                    var frases = JSON.parse(data);
                    frases.parar_musica.push(args.slice(1).join(" "));

                    try{
                        fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                            
                            if (err) throw err;

                            //elegir frase de agregar al azar
                            var agregada = frase_agregada[Math.floor(Math.random() * frase_agregada.length)];
                            
                            //borrar chache para actualizar lista de frases
                            delete require.cache['../frases.json'];

                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }

            fs.readFile("./frases.json", "utf-8", function(err, data) {

                if (err) throw err;
            
                const frases = JSON.parse(data);
                const lista = Object.keys(frases).join("\n");

                if(lista.indexOf(args[0]) == -1){
        
                    return message.reply("Asegurate de escribir una de las listas: \n\r**"+lista+"** \n\rEjemplo: `"+prefix+"frase no_voice Tienes que estar en un voice.`");
        
                }
            });
        }
	}
};
