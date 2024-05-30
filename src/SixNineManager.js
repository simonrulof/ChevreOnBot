const SixNineRoleID = '1245744244677672960'


async function sixNine(interaction){
    //console.log(roles.at(0))
    interaction.options._hoistedOptions[0].member.roles.add(SixNineRoleID)
    interaction.options._hoistedOptions[0].member.timeout(69)

    interaction.deferReply();
    interaction.deleteReply();
    
    setTimeout(() => {
        interaction.options._hoistedOptions[0].member.roles.remove(SixNineRoleID)
        interaction.options._hoistedOptions[0].member.timeout(69)
    }, 69000)
}



module.exports = { sixNine };   