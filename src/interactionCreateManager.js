const Discord = require('discord.js')



async function setup_ticket_channel(interaction){

    const exampleEmbed = new Discord.EmbedBuilder()
        .setColor(0x623460)
        .setTitle('Ouvrir un ticket')
        .setDescription('En cliquant sur \"Créer un Ticket\", un ticket s\'ouvrira pour vous')
        
    const button = new Discord.ButtonBuilder()
		.setCustomId('create Ticket')
		.setLabel('Créer un ticket')
		.setStyle(Discord.ButtonStyle.Primary);

    const row = new Discord.ActionRowBuilder()
			.addComponents(button);

    interaction.deferReply();
    interaction.deleteReply();

    const channel = interaction.guild.channels.cache.get(interaction.channelId)
    channel.send({
        embeds: [exampleEmbed],
        components: [row]
    })

}


function interactionCreate(interaction, bot){
    
    if (interaction.commandName === "ping"){
        setup_ticket_channel(interaction)
    }

    if (interaction.commandName === "setup_ticket_channel"){
        setup_ticket_channel(interaction)
    }
}

module.exports = { interactionCreate };