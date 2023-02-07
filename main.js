const Discord = require('discord.js');
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require('./config.json'); 
const fs = require('fs');
const { ActivityType } = require('discord.js');


client.login(config.token).then();

client.on('ready', () => {
    console.log(`Estou online como ${client.user.username}!`);
    client.user.setStatus('idle');
    client.user.setActivity('https://github.com/kayqueprogram/', { type: ActivityType.Watching});
});

// Quando o bot for adicionado a um servidor

client.on('guildCreate', guild => {
    // ${client.users.size} Para saber a quantidade de usuários no servidor
    // ${client.channels.size} Para saber em quanos canais o bot está
    // ${cliente.guilds.size} Para saber em quantos servidores o bot está
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores !`, {type: ActivityType.Playing}).then();
})

//Quando o bot for removido do servidor

client.on('guildDelete', guild => {
    console.log(`O bot foi removido do servidor ${guild.name}. (id: ${guild.id})`)
})

// Novo membro no servidor

client.on('guildMemberAdd', member => {
    const guild = member.guild;
    const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"))
    defaultChannel.send(`Bem vindo(a) ao time ${member.user}!`)
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands');

fs.readdirSync('./commands').forEach(local => {
    const commands = fs.readdirSync(`./commands/${local}`);

    for (let file of commands) {
        let puxar = require(`./commands/${local}/${file}`);

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        }
        if(puxar.aliases && Array.isArray(puxar.aliases)) {
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
        }

    }
})

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;     
  
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
      command.run(client, message, args)
  } catch (err) { 
     console.error('Erro:' + err); 
  }
});