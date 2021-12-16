const axios = require('axios');
const cheerio = require('cheerio');

// returns a promise containing page data
// .data returns html
// var with json data within one of the 'script' elements
// iterate thru scripts to get the one with the desired var
// json parse, stringify
// return
async function getPage (url) {
    const response = await axios('https://www.youtube.com/channel/' + url + '/videos')
    const data = response.data
    const $ = cheerio.load(data)
    const content = await findVar($('script'))
    let page = JSON.parse(content.substring(20, content.length - 1))
    return page
}

async function findVar (data) {
    for (i = 0; i < data.contents().length; i++){
        let str = data.contents()[i]['data']
        if (str.substring(0, 19) == "var ytInitialData =" ) { return str }
    }
}

async function getWritablePage(content) {
    let str = JSON.stringify(content, null, '\t')
    return str
}

module.exports = {
    getPage,
    getWritablePage
};