const { PermissionFlagsBits } = require('discord-api-types/v10');
const { ChannelType } = require('discord.js')


function createPrivateRoom(newState){


    // definir le nom du salon cree
    voiceName = newState.member.nickname
    if (voiceName === null){
        voiceName = newState.member.user.username
    }
    voiceName = "Salon vocal de " + voiceName


    // creer nouveau salon
    return newState.guild.channels.create({
        name: voiceName,
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
            {
                id: newState.id,
                allow: [
                    PermissionFlagsBits.ManageChannels,
                ],
            }
        ,],
    }).then((voiceChannel) => {

        // mettre l'utilisateur dans son salon
        newState.setChannel(voiceChannel)
        return Promise.resolve(voiceChannel)
    })

}

function checkAndDeletePrivateRoom(newState, privateRoomList){ 
     
    // pour tous les channels
    newState.guild.channels.fetch().then((channels) => {
        channels.forEach(function (item, i, array){
    
            // si le channel est dans la liste des channels "private room"
            index = privateRoomList.indexOf(item.id)
            if (index != -1){
                // et si le channel est vide, on le delete
                if (item.members.size == 0){
                    item.delete()
                    privateRoomList.splice(index, 1)
                }
            }
        })
    })
}

function voiceStateUpdate(oldState, newState, privateRoomList){

    // verifier que qqun join le salon créateur de salon temporaire
    if (newState.channelId === process.env.PERSONNAL_ROOM_CREATOR){
        createPrivateRoom(newState).then((voiceChannel) => {
            // console.log(voiceChannel.members.size) // to see how many ppl in voice channel
            privateRoomList.push(voiceChannel.id)
        })
    }
    else{
        // delete empty personal salons
        checkAndDeletePrivateRoom(newState, privateRoomList)
    }
}

module.exports = { voiceStateUpdate };