const { memberNicknameMention } = require('@discordjs/builders');

class Vtuber {
    constructor(
        name, name_jp, generation, youtube, bilibili, twitter, official,
        hashtag, emoji
    ) {
        const folder = require('./util/entryCreated.js');

        this.name = name;
        this.name_jp = name_jp;
        this.generation = generation;
        this.youtube = youtube;
        this.bilibili = bilibili;
        this.twitter = twitter;
        this.official = official;
        this.hashtag = hashtag;
        this.emoji = emoji;

        if (!folder.initialStart()) {
            this.createEntry();
        }
    }

    async update(){
        let data = {
            {
                ''
            }
        }
        
        let path = '../../mem/' + this.youtube + '.json';
        const fs = require('fs');
        fs.writeFile(path, data, function (err){
            console.log('error');
        }
        );


    }

    createEntry() {
        let path = '../../mem/' + this.youtube + '.json';

        const fs = require('fs');
        fs.createWriteStream(path);
    }
}