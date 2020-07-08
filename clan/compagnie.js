const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const { Client, MessageEmbed } = require('discord.js');

//Variabili

const help = require("./help/help")
const lista = require("./lista/lista")
const recluta = require("./recluta/recluta")
const congeda = require("./congeda/congeda")
const diserta = require("./diserta/diserta")

let bot
let text
let tuoclan
let nome
let leader
let utente
let nonclan


module.exports = (message,client) =>{
    utente = message.guild.member(message.mentions.members.first());
    bot = client
    text = message
    leader = config.capo    
    if(message.content == ">c help"){        

        help(message,client)
        
    }else if(message.content == ">c compagnia"){          

        trova()        
        lista(message,client,tuoclan,nome,leader)
        
    }else if(message.content.startsWith(">c recluta")){        

        trova()
        altro()
        recluta(message,client,tuoclan,utente,leader,nonclan)        

    }else if(message.content.startsWith(">c congeda")){        

        trova()        
        congeda(message,client,tuoclan,utente,leader)
        
    }else if(message.content == ">c diserta"){

        trova()
        diserta(message,client,tuoclan,leader)        
        
    }else if (message.content.startsWith(">c")){

        const embed = new MessageEmbed()
        .setTitle("⚙️ Mh, qualcosa è andato storto... ⚙️")
        .setDescription("Sintassi Comando errata o comando inesistente")
        .setColor(0x565656)
        message.channel.send(embed)
        logcomando()

    }    
}


function trova(){
    let test = []
    let e = 0
    test = config.clan
    let i = 0;
    while(e == 0){
        if(text.member.roles.cache.has(test[i])){
            e++
            tuoclan = test[i]
            nome = test[i-1]
        }
        i++
        if(i == config.nclan){
            e++
        }              
    }
    if(nome != undefined){
        if(nome.startsWith("P")){
            nome = "Predoni"
        }
        if(nome.startsWith("S")){
            nome = "Sindacati"
        }
        if(nome.startsWith("C")){                
            nome = "Confratelli"
        }   
    }     
}

function altro(){
    let test = [] 
    let e = 0
    test = config.clan
    let i = 0;
    if(utente != null){
        while(e == 0){
        if(utente.roles.cache.has(test[i])){
            e++
            nonclan = test[i]
        }
        i++
            if(i == config.nclan){
               e++
            }            
        }
    }   
}

function logcomando(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("⚙️ SINTASSI ERRATA ⚙️")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
        .setColor(0x565656)
    )
}


