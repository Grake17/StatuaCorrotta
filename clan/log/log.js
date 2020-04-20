const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")

let bot
let text

function log_compagnie(message,client){
    text = message
    bot = client
    if(message.content == ">c help"){
        loglista()
    }else if(message.content == ">")
    
}

function loglista(){
        const embed = new MessageEmbed()
        bot.channels.cache.get(config.log).send(
            embed.setTitle("📘 AIUTO UTENTE 📘")
            .setDescription(message.url)
            .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha richiesto la guida dei comandi", text.content)
            .setColor(0x0000ff)
        )
    }


module.exports = {
    log_compagnie
}