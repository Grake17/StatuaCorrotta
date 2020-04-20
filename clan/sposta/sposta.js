//Requirements
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const { Client, MessageEmbed } = require('discord.js');



let bot
let text


module.exports = (message,client,utente) => {
    bot = client
    text = message
    if(message.guild != null){           
        if(utente != null){
            if(utente.voice.channelID != null){
                if(utente.voice.channel.id == config.spostami){
                    let channel = message.member.voice.channel.id                 
                    let limit = message.member.voice.channel.userLimit
                    let n = message.member.voice.channel.members.size                   
                    if(limit > n){
                        const embed = new MessageEmbed()
                        .setTitle("✅ **COMANDO EFFETTUATO** ✅")
                        .setDescription("L'utente <@!" + utente + "> è spostato correttamente.")
                        .addField("🧙‍♂️ La magia funziona sempre!","**Destinazione**: `"+ message.member.voice.channel.name + "`")
                        .setColor(0x00ff00)
                        utente.voice.setChannel(channel)
                        message.channel.send(embed)
                        logsi()
                    }else if(limit == 0){
                        const embed = new MessageEmbed()
                        .setTitle("✅ **COMANDO EFFETTUATO** ✅")
                        .setDescription("L'utente <@!" + utente + "> è spostato correttamente.")
                        .addField("🧙‍♂️ La magia funziona sempre!","**Destinazione**: `"+ message.member.voice.channel.name + "`")
                        .setColor(0x00ff00)
                        utente.voice.setChannel(channel)
                        message.channel.send(embed)
                        logsi()                        
                    }else{
                        const embed = new MessageEmbed()
                        .setTitle("⚠️ **ATTENZIONE** ⚠️")
                        .setDescription("Il canale ha raggiunto il numero **massimo di utenti**.")
                        .setColor(0xff0000)
                        message.channel.send(embed)
                        log()
                    }     
                }else{
                    const embed = new MessageEmbed()
                    .setTitle("⚠️ **ATTENZIONE** ⚠️")
                    .setDescription("L'utente non è presente nel canale **'Spostami'!**")
                    .setColor(0xff0000)
                    message.channel.send(embed)
                    log()
                }
            }else{
                const embed = new MessageEmbed()
                .setTitle("⚠️ **ATTENZIONE** ⚠️")
                .setDescription("L'utente non è presente nel canale **'Spostami'!**")
                .setColor(0xff0000)
                message.channel.send(embed)
                log()
            }                
        }else{
            const embed = new MessageEmbed()
            .setTitle("⚠️ **ATTENZIONE** ⚠️")
            .setDescription("L'utente non è stato menzionato correttamente, **riprova**")
            .setColor(0xff0000)
            message.channel.send(embed)
            log()
        }
    }
}
    

    //Function Log
    function logsi(){
        const embed = new MessageEmbed()
        bot.channels.cache.get(config.log).send(
            embed.setTitle("✅ COMANDO EFFETTUATO ✅")
            .setDescription(text.url)
            .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
            .addField("---------------------------------------------","`⏬ spostami ⏬` ⏩ " + "`"+ text.member.voice.channel.name + "`")
            .setColor(0x00d000)
        )
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











