
const Discord = require('discord.js')

function getCommandList(){
    commands = []

    commands.push(
        new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('this is a ping command')   
    )

    commands.push(
        new Discord.SlashCommandBuilder()
        .setName('setup_ticket_channel')
        .setDescription('initialise l\'outil \"créer un ticket\" dans ce salon')
    )

    commands.push(
        new Discord.SlashCommandBuilder()
        .setName('setup_transcript_channel')
        .setDescription('initialise le salon actuel pour afficher les transcripts')
    )

    commands.push(
        new Discord.SlashCommandBuilder()
        .setName('setup_modo_id')
        .setDescription('setup le role qui aura acces aux salons tickets')
        .addStringOption((option) => 
            option.setName("modo_id")
                  .setDescription("id du role qui aura acces aux salons tickets")
                  .setRequired(true)
        )
    )


    return commands
}

module.exports = { getCommandList };