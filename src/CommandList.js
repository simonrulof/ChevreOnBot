
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


    return commands
}

module.exports = { getCommandList };