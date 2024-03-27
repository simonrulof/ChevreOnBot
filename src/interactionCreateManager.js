function interactionCreate(interaction){
    if (interaction.commandName === "ping"){
        interaction.reply("pong")
    }
}

module.exports = { interactionCreate };