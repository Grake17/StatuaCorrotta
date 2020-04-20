const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")


let text
let bot


module.exports = (message,client,tuoclan,utente,leader,nonclan) => {
    text = message
    bot = client
    
    if(utente == undefined){
        warning()
    }else{
        if(utente.user.bot != true){                                             
            if(message.member.roles.cache.has(leader) && message.member.roles.cache.has(tuoclan)){
                let clan = message.guild.roles.cache.get(tuoclan).members.size                                    
                if(clan < 51){                                                      
                    if(utente.roles.cache.has(nonclan)){
                        const embed = new MessageEmbed()
                        .setTitle("⚠️ ATTENZIONE ⚠️")
                        .setDescription("Non puoi arruolare <@!" + utente +">, **è già in una compagnia!**")
                        .setColor(0xff0000)
                        message.channel.send(embed)
                        log()                  
                    }else{
                        let name = message.member.roles.cache.get(tuoclan).name
                        const embed = new MessageEmbed()
                        .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
                        .setDescription("🔰"+ name + ", date il benvenuto a <@!" + utente +"> 🔰")
                        .addField("Utente reclutato con successo", "Che possa portare onore e gloria alla compagnia")
                        .setColor(0x00d000)
                        utente.roles.add(tuoclan).catch(console.error);                                    
                        message.channel.send(embed) 
                        logsi()
                    }                   
                }else{
                    const embed = new MessageEmbed()
                    .setTitle("⚠️ ATTENZIONE ⚠️")
                    .setDescription("La tua compagnia ha raggiunto la capienza massima")                                            
                    .setColor(0xff0000)                                                                           
                    message.channel.send(embed) 
                    log()
                }
            }else{
                nonpuoi()
            }                          
        }else {
            warningbot()
        }
    }
}

function warning(){
    const embed = new MessageEmbed()
    .setTitle("⚠️ ATTENZIONE ⚠️")
    .setDescription("Non hai menzionato correttamente l' utente")
    .setColor(0xff0000)
    text.channel.send(embed)              
    log()
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

function nonpuoi(){
    const embed = new MessageEmbed()
    .setTitle("⚠️ ATTENZIONE ⚠️")
    .setDescription("Non sei un Governatore!")
    .setColor(0xff0000)
    text.channel.send(embed)              
    log()
}

function warningbot(){
    const embed = new MessageEmbed()
    .setTitle("⚠️ ATTENZIONE ⚠️")
    .setDescription("Non puoi reclutare/congedare un BOT")
    .setColor(0xff0000)
    text.channel.send(embed)              
    log()
}






