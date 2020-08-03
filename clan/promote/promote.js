const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")

let text
let bot

module.exports = (message,client,utente,leader) => {

    text = message
    bot = client

    if(utente == undefined){
        warning()
    }else{
        if(utente.user.bot != true){ 
            if(utente.roles.cache.has(config.grado1)){
                if(message.member.roles.cache.has(leader) || message.member.roles.cache.has(config.grado3) || message.member.roles.cache.has(config.grado2)){
                    const embed = new MessageEmbed()
                        .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
                        .setDescription("🔰 <@!" + utente + "> è stato promosso a <@&" + message.guild.roles.cache.get(config.grado2) + "> 🔰")
                        .setColor(0x00d000)                         
                    message.guild.members.cache.get(utente.id).roles.add(config.grado2).catch(console.error); 
                    message.guild.members.cache.get(utente.id).roles.remove(config.grado1).catch(console.error);                      
                    message.channel.send(embed)                                        
                    logsi()
                }else{
                    nonpuoi()
                }
            }else if(utente.roles.cache.has(config.grado2)){
                if(message.member.roles.cache.has(leader) || message.member.roles.cache.has(config.grado3)){
                    const embed = new MessageEmbed()
                        .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
                        .setDescription("🔰 <@!" + utente + "> è stato promosso a <@&" + message.guild.roles.cache.get(config.grado3) + "> 🔰")
                        .setColor(0x00d000)                                  
                    message.guild.members.cache.get(utente.id).roles.add(config.grado3).catch(console.error); 
                    message.guild.members.cache.get(utente.id).roles.remove(config.grado2).catch(console.error);                      
                    message.channel.send(embed)                                        
                    logsi()
                }else{
                    nonpuoi()
                }
            }else{
                nonpuoi()
            }          
            
        }else{
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
        embed.setTitle("🏅 CAMBIO DI GRADO EFFETTUATO 🏅")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
        .setColor(0xffff00)
    )
}

function nonpuoi(){
    const embed = new MessageEmbed()
    .setTitle("⚠️ ATTENZIONE ⚠️")
    .setDescription("Non hai il permesso di eseguire questo comando!")
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