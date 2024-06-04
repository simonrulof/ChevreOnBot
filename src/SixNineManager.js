const SIXNINE_ID = '1245744244677672960'
const ADMIN_ID = '1029803595018805318'
const MODO_ID = '1247536581951094931'

async function sixNine(interaction){

    if (!interaction.member.roles.cache.some(role => role.id === MODO_ID) &&
        !interaction.member.roles.cache.some(role => role.id === ADMIN_ID)){
            interaction.reply({content: "vous n'avez pas les droits pour faire ca", ephemeral: true})
            return 0
        }
            
    //console.log(roles.at(0))
    interaction.options._hoistedOptions[0].member.roles.add(SIXNINE_ID)
    interaction.options._hoistedOptions[0].member.timeout(69000, "prend ton 69")

    
    setTimeout(() => {
        interaction.options._hoistedOptions[0].member.roles.remove(SIXNINE_ID)
        interaction.options._hoistedOptions[0].member.timeout(69)
    }, 69000)

    userName = interaction.options._hoistedOptions[0].member.nickname
    if (userName === null){
        userName = interaction.options._hoistedOptions[0].member.user.username
    }

    interaction.reply({content: `${userName} a bien été 69`, ephemeral: true})
}



module.exports = { sixNine };   