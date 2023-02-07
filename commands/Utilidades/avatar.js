const {Discord, EmbedBuilder} = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ['picture'],

    
    run: async(client, message, args) => {
        const user = message.author;
        
        const avatar = user.avatarURL({ dynamic: true, size: 1024 })

        
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Avatar de ${user.username}`)
            .setImage(`${avatar}`)
            .setFooter({ text: `Clique **[aqui](${avatar})** para baixar o avatar.`})
            
            
        message.reply(avatar)
}
}