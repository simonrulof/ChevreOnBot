const fs = require('fs')
const fs = require('node:fs');


async function setup_ticket_channel(interaction){

    const ticket_frame = new EmbedBuilder()
        .setColor(0x623460)
        .setTitle('Ouvrir un ticket')
        .setDescription('En cliquant sur \"Créer un Ticket\", un ticket s\'ouvrira pour vous')
        
    const button_ticket = new ButtonBuilder()
		.setCustomId('create Ticket')
		.setLabel('Créer un ticket')
		.setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
			.addComponents(button_ticket);

    interaction.deferReply();
    interaction.deleteReply();

    interaction.channel.send({
        embeds: [ticket_frame],
        components: [row]
    })

}


function getConfigs(){
    const allFileContents = fs.readFileSync(process.env.CONFIG_FILE, 'utf-8');

    configs = {}

    allFileContents.split(/\r?\n/).forEach(line =>  {
        console.log(`Line from file: ${line}`);
        splitted = line.split('=')
        if (splitted.length == 2){
            configs[splitted[0]] = splitted[1]
        }
    });

    console.log(configs)

    return configs

}

async function setup_config_line(interaction, config, value){
    const allFileContents = fs.readFileSync(process.env.CONFIG_FILE, 'utf-8');
    
    console.log(interaction.channel.id)

    output = []
    found = false
    allFileContents.split(/\r?\n/).forEach(line =>  {
        console.log(`Line from file: ${line}`);
        splitted = line.split('=')
        if (splitted[0] == config){
            found = true
            if (config == "CHANNEL_TRANSCRIPT_ID"){
                splitted[1] = interaction.channel.id
            }
            else{
                splitted[1] = value
            }
        }
        out = splitted.join('=')
        output.push(out)
        console.log(`moved to: ${out}`);
    });

    content = output.join("\n")
    fs.writeFileSync(process.env.CONFIG_FILE, content);
}

async function setup_transcript_channel(interaction){
    setup_config_line(interaction, "setup_modo_id", null)
}

async function setup_modo_id(interaction){
    console.log(interaction) // TODO CHANGER DANS LA DB LE MODO ID
}


module.exports = { getConfigs, setup_transcript_channel, setup_modo_id, setup_ticket_channel };   