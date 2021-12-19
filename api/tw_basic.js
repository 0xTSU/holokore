const axios = require('axios');
const cheerio = require('cheerio');

/*
This looks like it should be a class, but the data does not need to persist in memory.
Once the data is out of scope, it should be discarded.
*/

async function getPage(url) {
    const headers = {
        "user-agent" : "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    }
    var found = false
    var response
    
    // just bad code overall
    var $
    while (found == false) {
        response = await axios('https://nitter.net/' + url + '/with_replies', headers)
        $ = cheerio.load(response.data)
        var meme = $('.timeline').text()
        
        if (meme != "No items found") {
            found = true
        }
    }
    
    return response.data
}

async function getFollowers(data) {
    const $ = cheerio.load(data)
    var count = 0
    $('.profile-stat-num').each(function(index, element) {
        if (index == 2) {
            count = $(element).text()
        }
    })
    return count
}  

async function getName(data) {
    const $ = cheerio.load(data)
    return $('.profile-card-fullname').text()
}

async function getBasicInfo(data) {
    var info = {
        'name' : getName(data),
        'followers' : getFollowers(data)
    }
    return info
}

async function getLatestTweet(data, handle) {
    const $ = cheerio.load(data)
    var tweet = {}
    $('.timeline-item').each( function(index, element) {
        const author = $(element).find('.username').text()
        const pinned = $(element).find('.pinned').text()
        if ((author == '@' + handle) && (pinned != ' Pinned Tweet')) {
            tweet = {
                'body' : $(element).find('.tweet-content media-body').text(),
                'date' : $(element).find('.tweet-date').text(),
                'url' : 'https://twitter.com' + $(element).find('.tweet-link').text(),
                'stats' : $(element).find('.tweet-stats') // should b an array check back later
            }
        }
    })
    
    return tweet
}

module.exports = {
    getPage,
    getBasicInfo,
    getLatestTweet
}