const fs = require("fs");
const { prefix } = require("../config.json");
const { frase_agregada } = require("../frases.json")

module.exports = {
	name: 'frase',
    description: 'Agregar frases a Perritu',
	execute(client, message, args) {

        if(!args.length) {

            fs.readFile("./frases.json", "utf-8", function(err, data) {

                if (err) throw err;
            
                const frases = JSON.parse(data);
                const lista = Object.keys(frases).join("\n");
   
                message.reply("Puedes poner una frase para estas listas: \n\r**"+lista+" ** \n\rSolo tienes que poner `"+prefix+"frase lista oración`.");

            });
        }

        if(args.length >= 1){
        

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
                            
                            message.reply(agregada);

                        });
                    }catch(err){
                        console.log(err);
                    }

                });
            }
            else{

                fs.readFile("./frases.json", "utf-8", function(err, data) {

                    if (err) throw err;
                
                    const frases = JSON.parse(data);
                    const lista = Object.keys(frases).join("\n");
    
                    return message.reply("Asegurate de escribir una de las listas: \n\r**"+lista+"**");
                    
                });
                
            }
        }
	}
};