const EmbedBuilder  = require('discord.js');

module.exports = {
    name: "add",
    aliases: ['adicionar'],

    run: async(client, message, args) => {
        message.reply(`Me adicione em já em seu servidor! [clique aqui](https://discord.com/api/oauth2/authorize?client_id=1068951159764680764&permissions=395137251328&scope=bot).`)
    }
}