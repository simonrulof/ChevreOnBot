const fs = require('fs')

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
    setup_config_line(interaction, "CHANNEL_TRANSCRIPT_ID", null)
}

async function setup_modo_id(interaction){
    console.log(interaction)
}


module.exports = { getConfigs, setup_transcript_channel, setup_modo_id };   