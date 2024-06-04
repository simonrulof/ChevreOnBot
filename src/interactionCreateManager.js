const Discord = require('discord.js');
const { ChannelType, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ConfigManager = require('./ConfigsManager.js');
const discordTranscripts = require('discord-html-transcripts');
const SixNineManager = require('./SixNineManager.js')
const TicketManager = require('./TicketManager.js')
// TODO => change way of getting ID (database see with adra)







async function interactionCreate(interaction, bot){
    if (interaction.isChatInputCommand() )
    {
    
        if (interaction.commandName === "ping"){
            interaction.reply("pong")
        }

        if (interaction.commandName === "setup_ticket_channel"){
            ConfigManager.setup_ticket_channel(interaction)
        }

        if (interaction.commandName === "setup_transcript_channel"){
            ConfigManager.setup_transcript_channel(interaction)
        }

        if (interaction.commandName === "setup_modo_id"){
            ConfigManager.setup_modo_id(interaction)
        }

        if (interaction.commandName === "69"){
            SixNineManager.sixNine(interaction)
        }
    }

    if (interaction.isButton()){
        if (interaction.customId === "create Ticket"){
            TicketManager.create_ticket(interaction)
        }
        if (interaction.customId === "close ticket"){
            TicketManager.open_Modal_ticket(interaction)
        }
        if (interaction.customId === "claim ticket"){
            TicketManager.claim_ticket(interaction)
        }
    }

    if (interaction.isModalSubmit()){
        if (interaction.customId === "close ticket modal"){
            TicketManager.close_ticket(interaction)
        }
    }
}

module.exports = { interactionCreate };