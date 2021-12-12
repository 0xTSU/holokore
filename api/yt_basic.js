const axios = require('axios');
const cheerio = require('cheerio');

// returns a promise containing page data
// .data returns html
// var with json data within one of the 'script' elements
// iterate thru scripts to get the one with the desired var
// json parse, stringify
// return
async function getPage (url) {
    let response = await axios(url)
    const data = response.data
    let $ = cheerio.load(data)
    let content = await findVar($('script'))
    content = JSON.stringify(JSON.parse(content.substring(20, content.length - 1)), null, ' ')
    return content
}

async function findVar (data) {
    for (i = 0; i < data.contents().length; i++){
        let str = data.contents()[i]['data']
        if (str.substring(0, 19) == "var ytInitialData =" ) { return str }
    }
}

module.exports = {
    getPage
};