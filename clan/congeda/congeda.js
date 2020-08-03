const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")


let text
let bot

module.exports = (message,client,tuoclan,utente,leader) => {
    text = message
    bot = client
    if(utente == undefined){                        
        warning()
    }else{
        if(utente.user.bot == true){
            warningbot()
        }else{
            if((message.member.roles.cache.has(leader) || message.member.roles.cache.has(config.grado3) || message.member.roles.cache.has(config.grado2)) && message.member.roles.cache.has(tuoclan)){
                if(message.author.id == utente.id){

                    const embed = new MessageEmbed()
                    .setTitle("⚠️ ATTENZIONE ⚠️")
                    .setDescription("Non puoi congedare te stesso!")
                    .setColor(0xff0000)
                    message.channel.send(embed)
                    log()

                }else if((message.member.roles.cache.has(config.grado3) || message.member.roles.cache.has(config.grado3)) && (utente.roles.cache.has(config.grado3) || utente.roles.cache.has(config.grado2))){
                    
                    const embed = new MessageEmbed()
                    .setTitle("⚠️ ATTENZIONE ⚠️")
                    .setDescription("Non puoi congedare un utente con un grado uguale al tuo!")
                    .setColor(0xff0000)
                    message.channel.send(embed)
                    log() 

                }else if(message.member.roles.cache.has(config.grado2) && utente.roles.cache.has(config.grado3)){

                    const embed = new MessageEmbed()
                    .setTitle("⚠️ ATTENZIONE ⚠️")
                    .setDescription("Non puoi congedare un tuo superiore!")
                    .setColor(0xff0000)
                    message.channel.send(embed)
                    log() 

                }else{
                    if(utente.roles.cache.has(leader)){
                        const embed = new MessageEmbed()
                        .setTitle("⚠️ ATTENZIONE ⚠️")
                        .setDescription("**Non puoi congedare un Governatore**, per farlo chiedi ad un admin!")
                        .setColor(0xff0000)
                        message.channel.send(embed)
                        log()                      
                    }else if(utente.roles.cache.has(tuoclan)){                       

                        const embed = new MessageEmbed()
                        .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
                        .setDescription("🔰 <@&"+ message.member.roles.cache.get(tuoclan) + ">, date un ultimo saluto a <@!"+ utente +"> 🔰 ")
                        .addField("Utente congedato con successo","Mancherai alla tua compagnia, o forse no....")
                        .setColor(0x00d000)   

                        message.guild.members.cache.get(utente.id).roles.remove(tuoclan).catch(console.error);

                        if(utente.roles.cache.has(config.grado1)){

                            message.guild.members.cache.get(utente.id).roles.remove(config.grado1).catch(console.error);

                        }else if(utente.roles.cache.has(config.grado2)){

                            message.guild.members.cache.get(utente.id).roles.remove(config.grado2).catch(console.error);

                        }else if(utente.roles.cache.has(config.grado3)){

                            message.guild.members.cache.get(utente.id).roles.remove(config.grado3).catch(console.error);

                        }                       
                        message.channel.send(embed)                                        
                        logsi()
                    }else{ 
                        const embed = new MessageEmbed()
                        .setTitle("⚠️ ATTENZIONE ⚠️")
                        .setDescription("L'utente <@!"+ utente +"> non fa parte della tua compagnia")
                        .setColor(0xff0000)
                        message.channel.send(embed)
                        log()                              
                    }                                
                }
            }else{
                nonpuoi()                
            }
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