const { PermissionFlagsBits } = require('discord-api-types/v10');
const { ChannelType } = require('discord.js')

const PrivateRoomManager = require('./PrivateRoomManager.js')
PERSONNAL_ROOM_CREATOR_ID = '638401862692765720'

// function called when anyone join/leave a voice channel
function voiceStateUpdate(oldState, newState, privateRoomList){

    // verifier que qqun join le salon créateur de salon temporaire
    if (newState.channelId === PERSONNAL_ROOM_CREATOR_ID){
        PrivateRoomManager.createPrivateRoom(newState).then((voiceChannel) => {
            // console.log(voiceChannel.members.size) // to see how many ppl in voice channel
            privateRoomList.push(voiceChannel.id)
        })
    }
    else{
        // delete empty personal salons
        PrivateRoomManager.checkAndDeletePrivateRoom(newState, privateRoomList)
    }
}

module.exports = { voiceStateUpdate };