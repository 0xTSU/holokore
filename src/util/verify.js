const data = require('../../data/agency.json');
const keys = require('../../data/keys.json');
const chuuba = require('../../data/data.json');
const fs = require('fs/promises');

const url = "UCP0BspO_AMEe3aQqqpo89Dg"

async function verify (channel_id) {
    const path = './mem/' + channel_id + '.json';
    let file
    try {
        file = await fs.open(path, 'r')
        console.log("meme")
    } catch {
        console.log("error")
    }
    return file
}

verify(url).then()