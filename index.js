
const Discord = require('discord.js')

require("dotenv").config();

const VoiceStateUpdateManager = require('./src/VoiceStateUpdateManager.js')
const messageCreateManager = require('./src/VoiceStateUpdateManager.js')
const interactionCreateManager = require('./src/interactionCreateManager.js')
const CommandList = require('./src/CommandList.js')
const packageJSON = require("./package.json");


let privateRoomList = []

const bot = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates
    ], 
})

bot.on('ready', function () {

    commands = CommandList.getCommandList()

    for (const command of commands) {
        bot.application.commands.create(command)
    }
    
    console.log("ChevreOnBot en ligne !")
    bot.user.setActivity("Powered by la Chevre de Légende")
    console.log("discord v" + packageJSON.dependencies["discord.js"])
    
})


bot.on("interactionCreate", (interaction) => {
    // console.log(interaction)
    
    interactionCreateManager.interactionCreate(interaction)

})

Discord.ChatInputCommandInteraction



bot.on("messageCreate", async (message) => {
    // messageCreateManager.messageCreateManager(message)
    
})

bot.on("voiceStateUpdate", async (oldState, newState) => {

    // verifier que qqun join le salon créateur de salon temporaire
    VoiceStateUpdateManager.voiceStateUpdate(oldState, newState, privateRoomList)
})

bot.login(process.env.TOKEN)