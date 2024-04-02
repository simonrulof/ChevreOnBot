const Discord = require('discord.js')
const { ChannelType } = require('discord.js')

async function create_ticket(interaction){

    channelName = interaction.member.nickname
    if (channelName === null){
        channelName = interaction.member.user.username
    }

    interaction.guild.channels.create({
        name: `ticket de ${channelName}`,
        type: ChannelType.GuildText,
        parent: interaction.channel.parentId,
    })

    interaction.deferReply();
    interaction.deleteReply();


}

async function setup_ticket_channel(interaction){

    const ticket_frame = new Discord.EmbedBuilder()
        .setColor(0x623460)
        .setTitle('Ouvrir un ticket')
        .setDescription('En cliquant sur \"Créer un Ticket\", un ticket s\'ouvrira pour vous')
        
    const button_ticket = new Discord.ButtonBuilder()
		.setCustomId('create Ticket')
		.setLabel('Créer un ticket')
		.setStyle(Discord.ButtonStyle.Primary);

    const row = new Discord.ActionRowBuilder()
			.addComponents(button_ticket);

            interaction.deferReply();
            interaction.deleteReply();

    const channel = interaction.guild.channels.cache.get(interaction.channelId)
    channel.send({
        embeds: [ticket_frame],
        components: [row]
    })

}


function interactionCreate(interaction, bot){
    if (interaction.isChatInputCommand() )
    {
    
        if (interaction.commandName === "ping"){
            setup_ticket_channel(interaction)
        }

        if (interaction.commandName === "setup_ticket_channel"){
            setup_ticket_channel(interaction)
        }
    }

    if (interaction.isButton()){
        if (interaction.customId === "create Ticket"){
            create_ticket(interaction)
        }
    }
}

module.exports = { interactionCreate };