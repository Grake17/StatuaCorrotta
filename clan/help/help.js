const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")

let bot
let text

module.exports = (message,client) => {
    text = message
    bot = client
    const embed = new MessageEmbed()
    .setDescription("Lista Comandi delle compagnie;")    
    .addField("--------------------------------------","🔸**Governatore**")
    .addField("Recluta Utente" ,  ">c recluta @nome_utente")
    .addField("Congeda Utente",  ">c congeda @nome_utente")
    .addField("--------------------------------------","🔹**Utente**")                            
    .addField("Lista dei membri della tua compagnia", ">c compagnia") 
    .addField("Abbandona la tua compagnia", ">c diserta")
    .addField("Lista di comandi",">c help")  
    .addField("Sposta Utente",">c sposta @nome_utente")                         
    .setColor(0x0000ff)
    message.channel.send(embed)
    loglista()
}

function loglista(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("📘 AIUTO UTENTE 📘")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha richiesto la guida dei comandi", text.content)
        .setColor(0x0000ff)
    )
}

