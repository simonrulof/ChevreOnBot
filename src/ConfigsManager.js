const fs = require('fs')

function getConfigs(FileName){
    const allFileContents = fs.readFileSync(FileName, 'utf-8');

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

async function setup_transcript_channel(interaction){
    const allFileContents = fs.readFileSync(FileName, 'utf-8');
    
    console.log(interaction.channel.id)

    output = []
    found = false
    allFileContents.split(/\r?\n/).forEach(line =>  {
        console.log(`Line from file: ${line}`);
        splitted = line.split('=')
        if (splitted[0] == "CHANNEL_TRANSCRIPT_ID"){
            found = true
            splitted[1] = interaction.channel.id
        }
    });
}



module.exports = { getConfigs, setup_transcript_channel };   