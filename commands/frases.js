const fs = require("fs");
const { prefix } = require("../config.json");

module.exports = {
	name: 'frase',
    description: 'Agregar frases a Perritu',
	execute(client, message, args) {

        const msg = args.join(" ");

        if(!args.length) {

            fs.readFile("./frases.json", "utf-8", function(err, data) {

                if (err) throw err;

                const list = JSON.parse(data);
                const lista = Object.keys(list).join(",\n");
                
                message.reply("Puedes poner una frase para estas listas: \n\r**"+lista+". ** \n\rSolo tienes que poner `"+prefix+"frase lista oración`.");

            });

        }
        else{

            fs.readFile("./frases.json", "utf-8", function(err, data) {

                if (err) throw err;

                var frases = JSON.parse(data);

                frases.prueba.push(msg)

                try{
                    fs.writeFile("./frases.json", JSON.stringify(frases), "utf-8", function(err){
                        
                        if (err) throw err;
                        message.reply("Frase agregada!");

                    });
                }catch(err){
                    console.log(err);
                }

            });
        }

	}
};