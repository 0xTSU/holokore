const Discord = require('discord.js');
const config = require('../data/config.json');
const data = require("../data/data.json");
const keys = require('../data/keys.json').keys
const vtubers = require('./chuuba.js');
const path = require('path');

const ALL_INTENTS = 
    (1 << 0) +  // GUILDS
    (1 << 9);

const dbot = new Discord.Client({ intents: ALL_INTENTS });


class bot extends Discord.Client {
    constructor(options) {
        super(options)

        this.directory = []
        
    }

    async verify(channel_id) {

        const fs = require('fs');

        fs.stat('../mem/' + channel_id + '.json', (err, stat) => {
            if (err) {
                return true
            }else {
                return false
            }
        })
    }

    async readMem() {

    }

    async createMem(channel_id, twitter) {

        const channel = await crawlChannel(channel_id)

        const tweet = await crawlTwit(twitter)
    }

    // garbage
    async crawlChannel(channel_id) {
        const tubepi = require('../api/yt_basic.js')
        const channel = await tubepi.getPage(channel_id)

        

        const i = await this.getVideoIndex(channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'])
        const name = channel['metadata']['channelMetadataRenderer']['title']
        const avatar = channel['metadata']['channelMetadataRenderer']['avatar']['thumbnails'][0]['url']
        const sub_count = channel['header']['c4TabbedHeaderRenderer']['subscriberCountText']['simpleText']
        const content_link = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['videoId']
        const content_thumbnail = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['thumbnail']['thumbnails'][await this.getLastElement(channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][0]['gridVideoRenderer']['thumbnail']['thumbnails'])]['url']
        const content_title = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['title']['runs'][0]['text']

        const isLive = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['thumbnailOverlays'][0]['thumbnailOverlayTimeStatusRenderer']['style']

        var content_views = "0"
        if (isLive == "LIVE") {
            content_views = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['viewCountText']['runs'][0]['text']
        }else if (isLive == "DEFAULT") {
            content_views = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['viewCountText']['simpleText']
        }

        var details = {
            "youtube": {
                "name" : name,
                "avatar" : avatar,
                "subscriber-count" : sub_count,
                "streaming" : isLive,
                "video-title" : content_title,
                "video-link" : content_link,
                "thumbnail" : content_thumbnail,
                "viewcount" : content_views
            }
        }

        return details
        
    }

    async crawlTwitter(twitter) {
        const birdpi = require('../api/tw_basic.js')
        const bird = await birdpi.getPage(twitter)
        const tweet = await birdpi.getLatestTweet(bird, twitter)
        const info = await birdpi.getBasicInfo(bird)

        var body = {
            'twitter': {
                'name' : await info.name,
                'followers' : await info.followers,
                'tweet' : {
                    'body' : await tweet.body,
                    'date' : await tweet.date,
                    'url' : await tweet.url,
                    'stats' : await tweet.stats
                }
            }
        }

        return body
    }
    
    // youtube util
    async getLastElement(array) {
        return (array.length - 1)
    }

    async getVideoIndex(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]['gridVideoRenderer']['thumbnailOverlays'][0]['thumbnailOverlayTimeStatusRenderer']['style'] != "UPCOMING") {
                return i
            }
        }
    }

    async createChannel(msg, agency) {
        this.channels.cache.get //922291809667907665
    }


    async update() {
        const fs = require('fs/promises')
        
    }

    async init() {

        
        this.on('ready', () => {
            console.log('ready');

        })

    }

}

let dcord = new bot({intents: ALL_INTENTS})
dcord.init();

dcord.on('messageCreate', (message) => {

    if (message.content == "!start" && message.member.roles.highest.id == config.adminRole){

        for (var i = 0; i < keys.length; i++) {

            let toober = new Map<String, keys[i]>
            dcord.directory.push(new Vtub)
            const name = (keys.length == 1)? keys[i]['agency'] : '#' + toString(i) + keys[i]['agency']
            message.guild.channels.create(keys[i]['agency'], {
                type: 'text',
            })
            .then((channel) => {
                channel.setParent(config.category)

                console.log(keys[i])
                for (var r = 0; r < keys[i]['region'].length; r++) {
                    const region = keys[i]['region'][r]
                    for (var g = 0; g < keys[i]['generation'][r].length; g++) {
                        const gen = keys[i]['generation'][r][g]
                        for (var k = 0; k < data[i][region][r][gen].length; k++) {
                            channel.threads.create({
                                name: data[i][region][r][gen][g][k].name,
                                autoArchiveDuration: 86400,
                                reason: data[region][gen][k].name + "'s notifications"
                            })
                        }
    
                    }
                }
                
            })

        }

    }

})

dcord.login(config.token);
