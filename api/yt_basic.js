const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

const url = 'https://www.youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg';

/*
axios(url)
    .then(response => {
        const html = response.data
        let $ = cheerio.load(html)
        let text = $('script').contents()['23']['data']
        text = JSON.stringify(JSON.parse(text.substring(20, text.length - 1)), null, ' ')
        fs.writeFile('./wah.json', text, function(err) {
            if (err) {
                return console.log(err)
            }
        })
        
    })
*/
async function getPage (url) {
    let response = await axios(url)
    const data = response.data
    let $ = cheerio.load(data)
    let text = $('script').contents()['23']['data']
    text = JSON.stringify(JSON.parse(text.substring(20, text.length - 1)), null, ' ')
    return text
}

getPage(url).then( (response) => {
    console.log(response)
})