const VoiceStateUpdateManager = require('./src/VoiceStateUpdateManager.js')
const Discord = require('discord.js')
require("dotenv").config();

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
  console.log("ChevreOnBot en ligne !")
})

bot.on("messageCreate", async (message) => {
    if (message.content === "ping") {
      message.reply("pong !")
    }
})

bot.on("voiceStateUpdate", async (oldState, newState) => {

    // verifier que qqun join le salon créateur de salon temporaire
    VoiceStateUpdateManager.voiceStateUpdate(oldState, newState, privateRoomList)
})

bot.login(process.env.TOKEN)