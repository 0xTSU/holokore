const Discord = require('discord.js');
const config = require('../data/config.json');
const data = require('../data/data.json');
const chuubas = require("../data/data.json");
const path = require('path');
const { title } = require('process');

// all intents for now until i figure out whether or not im satisfied with this project
const ALL_INTENTS = 
    (1 << 0) +  // GUILDS
    (1 << 1) +  // GUILD_MEMBERS
    (1 << 2) +  // GUILD_BANS
    (1 << 3) +  // GUILD_EMOJIS_AND_STICKERS
    (1 << 4) +  // GUILD_INTEGRATIONS
    (1 << 5) +  // GUILD_WEBHOOKS
    (1 << 6) +  // GUILD_INVITES
    (1 << 7) +  // GUILD_VOICE_STATES
    (1 << 8) +  // GUILD_PRESENCES
    (1 << 9) +  // GUILD_MESSAGES
    (1 << 10) + // GUILD_MESSAGE_REACTIONS
    (1 << 11) + // GUILD_MESSAGE_TYPING
    (1 << 12) + // DIRECT_MESSAGES
    (1 << 13) + // DIRECT_MESSAGE_REACTIONS
    (1 << 14);  // DIRECT_MESSAGE_TYPING

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
        const sub_count = channel['header']['c4TabbedHeaderRenderer']['subscriberCountText']['simpletext']
        const content_link = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['videoId']
        const content_thumbnail = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['thumbnail']['thumbnails'][await this.getLastElement(channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][0]['gridVideoRenderer']['thumbnail']['thumbnails'])]['url']
        const content_title = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['title']['runs'][0]['text']

        const isLive = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['thumbnailOverlays'][0]['thumbnailOverlayTimeStatusRenderer']['style']

        const content_views = "0"
        if (isLive == "LIVE") {
            content_views = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['viewCountText']['runs'][0]['text']
        }else if (isLive == "DEFAULT") {
            content_views = channel['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['gridRenderer']['items'][i]['gridVideoRenderer']['viewCountText']['simpleText']
        }

        const details = {
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

        return JSON.stringify(details)
        
    }

    async crawlTwitter(twitter) {

    }
    
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

    async init() {

        this.on('ready', () => {
            console.log('ready');
        })
    }


}

let dcord = new bot({intents: ALL_INTENTS})
dcord.init();
dcord.login(config.token);
