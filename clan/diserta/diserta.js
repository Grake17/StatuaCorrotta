const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")


let text
let bot


module.exports = (message,client,tuoclan,leader) => {
    text = message
    bot = client
    if(message.member.roles.cache.has(leader)){                        
        const embed = new MessageEmbed()
        .setTitle("⚠️ ATTENZIONE ⚠️")
        .setDescription("**Sei il Governatore**, per congedarti chiedi ad un admin!")
        .setColor(0xff0000)
        message.channel.send(embed)
        log()
    }else if(message.member.roles.cache.has(tuoclan)){
            const embed = new MessageEmbed()
            .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
            .setDescription("🔰 Dove stai scappando <@!"+ message.author +"> 🔰")
            .addField("Compagnia disertata con successo","I disertori non sono ben visti, occhio alla forca!")
            .setColor(0x00d000)                                  
            message.member.roles.remove(tuoclan).catch(console.error);
            if(message.member.roles.cache.has(config.grado1)){
                message.member.roles.remove(config.grado1).catch(console.error);
            }else if(message.member.roles.cache.has(config.grado2)){
                message.member.roles.remove(config.grado2).catch(console.error);
            }else if(message.member.roles.cache.has(config.grado3)){
                message.member.roles.remove(config.grado3).catch(console.error);
            } 
                
            message.channel.send(embed)
            logsi()           
    }else{
        const embed = new MessageEmbed()
        .setTitle("⚠️ ATTENZIONE ⚠️")
        .setDescription("Non sei in nessuna compagnia!")
        .setColor(0xff0000)
        message.channel.send(embed)              
        log()
    }    
}

function log(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("⚠️ ATTENZIONE ⚠️")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
        .setColor(0xff0000)
    )
}

function logsi(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("✅ COMANDO EFFETTUATO ✅")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
        .setColor(0x00d000)
    )
}