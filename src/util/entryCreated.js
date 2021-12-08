const data = require('../../data/agency.json');
const keys = require('../../data/keys.json');
const chuuba = require('../../data/data.json');

const fs = require('fs');

function initialStart() {
    return (fs.existsSync('../../mem'));
}

function entryCreated(channel_id) {
    return (initialStart() &&
            fs.existsSync('../../mem/' + channel_id));
}


module.exports = {
    entryCreated,
    initialStart
}