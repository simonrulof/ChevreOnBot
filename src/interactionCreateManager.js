const Discord = require('discord.js')
const { ChannelType, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

async function close_ticket(interaction){

    // TODO => get reason of ticket close, and print recap of ticket on transcript salon

    interaction.channel.delete()
    interaction.deferUpdate()
}

async function open_Modal_ticket(interaction){
    const modal = new ModalBuilder()
        .setCustomId('close ticket modal')
        .setTitle('Fermer le ticket');

    
	const reasonCloseTicket = new TextInputBuilder()
        .setCustomId('close ticket reason')
        .setLabel("Raison")
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(reasonCloseTicket);

    modal.addComponents(firstActionRow)

    await interaction.showModal(modal)
}

async function create_ticket(interaction){

    channelName = interaction.member.nickname
    if (channelName === null){
        channelName = interaction.member.user.username
    }

    interaction.guild.channels.create({
        name: `ticket de ${channelName}`,
        type: ChannelType.GuildText,
        parent: interaction.channel.parentId,
    }).then((newChannel) => {

        const open_ticket_message_frame = new EmbedBuilder()
        .setColor(0x623460)
        .setTitle(`Ticket de ${channelName}`)
        .setDescription(`Bienvenue dans le ticket de ${channelName}\nVeuillez décrire votre problème, une réponse sera donnée dans les plus brefs délais`)
        
        const button_close_ticket = new ButtonBuilder()
            .setCustomId('close ticket')
            .setLabel('Fermer un ticket')
            .setStyle(ButtonStyle.Primary);
        
        const button_claim_ticket = new ButtonBuilder()
            .setCustomId('claim ticket')
            .setLabel('prendre en charge le ticket')
            .setStyle(ButtonStyle.Primary);
    
        const row = new ActionRowBuilder()
            .addComponents(button_close_ticket, button_claim_ticket);
    
        newChannel.send({
            embeds: [open_ticket_message_frame],
            components: [row]
        })

    })

    interaction.deferReply();
    interaction.deleteReply();

}

async function setup_ticket_channel(interaction){

    const ticket_frame = new EmbedBuilder()
        .setColor(0x623460)
        .setTitle('Ouvrir un ticket')
        .setDescription('En cliquant sur \"Créer un Ticket\", un ticket s\'ouvrira pour vous')
        
    const button_ticket = new ButtonBuilder()
		.setCustomId('create Ticket')
		.setLabel('Créer un ticket')
		.setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
			.addComponents(button_ticket);

    interaction.deferReply();
    interaction.deleteReply();

    interaction.channel.send({
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
        if (interaction.customId === "close ticket"){
            open_Modal_ticket(interaction)
        }
    }

    if (interaction.isModalSubmit()){
        if (interaction.customId === "close ticket modal"){
            close_ticket(interaction)
        }
    }
}

module.exports = { interactionCreate };