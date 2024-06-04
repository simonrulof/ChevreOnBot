const { PermissionFlagsBits } = require('discord-api-types/v10');
const { ChannelType } = require('discord.js')

// create a private room for someone
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
        parent: newState.channel.parent,
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

// check if a private room is empty, and delete it if so
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

module.exports = { createPrivateRoom, checkAndDeletePrivateRoom }