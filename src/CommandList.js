
const Discord = require('discord.js')

function getCommandList(){
    commands = []

    commands.push(
        new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('this is a ping command')
    )
    return commands
}

module.exports = { getCommandList };