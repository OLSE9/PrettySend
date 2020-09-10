const Discord = require('discord.js');
const Maths = require('mathjs')
const bot = new Discord.Client()

bot.on('ready', async () => {
    console.log(`Bot ready!\nUsername: ${bot.user.tag}\nID:${bot.user.id}`)
})

bot.on('message', async message => {
    const prefix = "c!";
    if(message.author.bot || message.channel.type === "dm") return;

    if(message.content.startsWith(prefix + "send")){
        console.log(message.content);
        message.channel.send("In which channel do you want to send your message?")
        let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000})
        collector.once('collect', message => {
            var channel = message.mentions.channels.first();
            if(!channel) return message.channel.send("That isn't a valid channel mention");

            message.channel.send("What message do you want to send?")
            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000})
            collector.once('collect', message => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(message)
                    .setFooter(Maths.pickRandom(["Bot made by OLSE9#9999", "Try also OLSEBOT - https://www.olsebot.tk"]))
                    .setColor("0x14F253");

                if(message.attachments.first()){
                    if(message.attachments.first().name.endsWith(`.png`) || message.attachments.first().name.endsWith(`.jpg`)){//Download only png
                        embed.setImage(message.attachments.first().url);
                    }
                };
                
                channel.send(embed);
                message.channel.send("Sent");
            });
        });
    } else if(message.content.startsWith(prefix + "edit")) {
        console.log(message.content);
        message.channel.send("In which channel is message that you want to edit?");
        let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000})
        collector.once('collect', message => {
            const channel = message.mentions.channels.first();
            if(!channel) return message.channel.send("That isn't a valid channel mention");

            message.channel.send("What is the id of the message that you want to edit?")
            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000})
            collector.once('collect', message => {
                if(isNaN(message.content) || message.content.length != 18) return message.channel.send("That isn't a valid ID")
                channel.messages.fetch(message.content)
                    .then(editMsg => {
                        if(editMsg.author.id != 753247396443455569) return message.channel.send("That message wasn't sent by me");
                        message.channel.send("What shoudl I edit the message to?")
                        let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000})
                        collector.once('collect', msg => {
                            const embed = new Discord.MessageEmbed()
                                .setDescription(msg)
                                .setFooter(Maths.pickRandom(["Bot made by OLSE9#9999", "Try also OLSEBOT - https://www.olsebot.tk"]))
                                .setColor("0x14F253");
            
                            if(msg.attachments.first()){
                                if(msg.attachments.first().name.endsWith(`.png`) || msg.attachments.first().name.endsWith(`.jpg`)){//Download only png
                                    embed.setImage(msg.attachments.first().url);
                                }
                            };
                            
                            editMsg.edit(embed);
                            message.channel.send("Edited");
                        });
                    })
                    .catch(console.error);
            });
        });
    };
});

bot.login("BOT TOKEN HERE");
