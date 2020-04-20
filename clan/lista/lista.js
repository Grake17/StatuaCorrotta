const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json")


//Variabili
let text
let bot

module.exports = (message,client,tuoclan,nome,leader) => {
    text = message
    bot = client
    if(message.member.roles.cache.has(tuoclan)){                                     
        let clan = message.guild.roles.cache.get(tuoclan).members.map(m=>m.user.tag)
        let n = message.guild.roles.cache.get(tuoclan).members.size
        let capo = message.guild.roles.cache.get(leader).members.map(m=>m.user.tag)
        let m = message.guild.roles.cache.get(leader).members.size                      
        let x = 0
        let y = 0
        let z = 0
        let name = message.member.roles.cache.get(tuoclan).name                           
        const embed = new MessageEmbed()
        .setTitle("🛡️ Statua Corrotta al suo servizio! 🛡️")
        .setColor(0x00d000)
        if(n < 11){
            embed.setDescription("🏷️ Nome: " + name + " \n 👥 Membri: " + n + "\n 🔰 Fazione: " + nome + "\n 🌟 Livello: ⭐")
        }else if(n < 21){
            embed.setDescription("🏷️ Nome: " + name + " \n 👥 Membri: " + n + "\n 🔰 Fazione: " + nome + "\n 🌟 Livello: ⭐⭐")
        }else if(n < 31){
            embed.setDescription("🏷️ Nome: " + name + " \n 👥 Membri: " + n + "\n 🔰 Fazione: " + nome + "\n 🌟 Livello: ⭐⭐⭐")
        }else if(n < 41){
            embed.setDescription("🏷️ Nome: " + name + " \n 👥 Membri: " + n + "\n 🔰 Fazione: " + nome + "\n 🌟 Livello: ⭐⭐⭐⭐")
        }else{
            embed.setDescription("🏷️ Nome: " + name + " \n 👥 Membri: " + n + "\n 🔰 Fazione: " + nome + "\n 🌟 Livello: ⭐⭐⭐⭐⭐")
        } 
        while(n != x){
            while(y != m){                                                                                                          
                if(clan[x] == capo[y]){                                        
                    embed.addField("----------------------------------------", "👑 - " +capo[y])
                    z = 1
                }
                y++                                    
            }
            if(z != 1){
                embed.addField("----------------------------------------","👤 - " +clan[x])                                    
            }
            x++ 
            y = 0
            z = 0
            if(n == 25){
                message.channel.send(embed)
                embed.fields = []
            }                                                                                                                         
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


function logsi(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("✅ COMANDO EFFETTUATO ✅")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username +"#"+text.author.discriminator+" ha eseguito un comando", text.content)
        .setColor(0x00d000)
    )
}
function log(){
    const embed = new MessageEmbed()
    bot.channels.cache.get(config.log).send(
        embed.setTitle("⚠️ ATTENZIONE ⚠️")
        .setDescription(text.url)
        .addField("L'utente " + text.author.username + "#" + text.author.discriminator + " ha eseguito un comando", text.content)
        .setColor(0xff0000)
    )
}




