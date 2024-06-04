const Discord = require('discord.js');
const { ChannelType, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');


const CHANNEL_TRANSCRIPT_ID = "1232252872109064193"
const EVERYONE_ID = "638401862692765716"
const MODO_ID = "1247536581951094931"
const ADMIN_ID = '1029803595018805318'


async function claim_ticket(interaction){

    if (!interaction.member.roles.cache.some(role => role.id === MODO_ID) &&
        !interaction.member.roles.cache.some(role => role.id === ADMIN_ID)){
            interaction.reply({content: "vous n'avez pas les droits pour faire ca", ephemeral: true})
            return 0
        }

    interaction.channel.permissionOverwrites.edit(MODO_ID, {
        ViewChannel: false
    })

    interaction.channel.permissionOverwrites.edit(interaction.member.id, {
        ViewChannel: true
    })

    const button_close_ticket_available = new ButtonBuilder()
            .setCustomId('close ticket')
            .setLabel('Fermer un ticket')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(false);

    const button_claim_ticket_disabled = new ButtonBuilder()
        .setCustomId('claim ticket')
        .setLabel('prendre en charge le ticket')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true);

    const row = new ActionRowBuilder()
        .addComponents(button_close_ticket_available, button_claim_ticket_disabled)

    interaction.message.edit({
        components: [row]
    })

    userName = interaction.member.nickname
    if (userName === null){
        userName = interaction.member.user.username
    }

    const claim_ticket_message_frame = new EmbedBuilder()
        .setColor(0x623460)
        .setTitle(`Ticket prit en charge par ${userName}`)
        
    interaction.channel.send({
        embeds: [claim_ticket_message_frame]
    })

    interaction.deferReply();
    interaction.deleteReply();
}


async function close_ticket(interaction){

    if (!interaction.member.roles.cache.some(role => role.id === MODO_ID) &&
        !interaction.member.roles.cache.some(role => role.id === ADMIN_ID)){
            interaction.reply({content: "vous n'avez pas les droits pour faire ca", ephemeral: true})
            return 0
        }

    

    output_reason = interaction.fields.getTextInputValue("close ticket reason")
    
    interaction.guild.channels.fetch(CHANNEL_TRANSCRIPT_ID).then((transcript_channel) => {

        userName = interaction.member.nickname
        discordTranscripts.createTranscript(interaction.channel).then((attachment) => { 
            if (userName === null){
                userName = interaction.member.user.username
            }

            const closing_ticket_recap_embed = new EmbedBuilder()
                .setColor(0x623460)
                .setTitle(`${interaction.channel.name}`)
                .setDescription(`Ticket fermé par ${userName} pour raison : \n${output_reason}`)
            
            transcript_channel.send({
                embeds: [closing_ticket_recap_embed],
                files: [attachment],
            });

            interaction.channel.delete()
            interaction.deferUpdate()
        })

    })


}

async function open_Modal_ticket(interaction){

    if (!interaction.member.roles.cache.some(role => role.id === MODO_ID) &&
        !interaction.member.roles.cache.some(role => role.id === ADMIN_ID)){
            interaction.reply({content: "vous n'avez pas les droits pour faire ca", ephemeral: true})
            return 0
        }

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

        newChannel.permissionOverwrites.set([
            {
                id: EVERYONE_ID,
                deny: [Discord.PermissionsBitField.Flags.ViewChannel,
                       Discord.PermissionsBitField.Flags.SendMessages]
            },
            {
                id: MODO_ID,
                allow: [Discord.PermissionsBitField.Flags.ViewChannel],
                deny: [Discord.PermissionsBitField.Flags.SendMessages]
            },
            {
                id: interaction.member.id,
                allow: [Discord.PermissionsBitField.Flags.ViewChannel, 
                        Discord.PermissionsBitField.Flags.SendMessages],
            }
        ])

        const open_ticket_message_frame = new EmbedBuilder()
            .setColor(0x623460)
            .setTitle(`Ticket de ${channelName}`)
            .setDescription(`Bienvenue dans le ticket de ${channelName}\nVeuillez décrire votre problème, une réponse sera donnée dans les plus brefs délais`)
        
        const button_close_ticket_disabled = new ButtonBuilder()
            .setCustomId('close ticket')
            .setLabel('Fermer un ticket')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        
        const button_claim_ticket = new ButtonBuilder()
            .setCustomId('claim ticket')
            .setLabel('prendre en charge le ticket')
            .setStyle(ButtonStyle.Primary)
    
        const row = new ActionRowBuilder()
            .addComponents(button_close_ticket_disabled, button_claim_ticket);
    
        newChannel.send({
            embeds: [open_ticket_message_frame],
            components: [row]
        })

    })

    interaction.deferReply();
    interaction.deleteReply();

}

module.exports = { create_ticket, open_Modal_ticket, close_ticket, claim_ticket };   