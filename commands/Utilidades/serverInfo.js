const Discord = require('discord.js');

module.exports = {
    name: "server",
    aliases: ['sv', 'info'],

    run: async(client, message, args) => {
        message.reply(`Este servidor possui ${client.users.size} membros!`)
    }
}