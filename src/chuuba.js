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

        if (!folder.entryCreated(this.youtube)) {
            this.createEntry();
        }
    };

    async 

    async update(){

        let data = {
            'twitter': {
                'link': '',
                'msg_id': ''
            },
            'livestream': {
                'live': false,
                'link': '',
                'msg_id': ''
            },
            'stats': {
                'twitter': {
                    'current': '',
                    'prev': ''
                },
                'youtube': {
                    'current': '',
                    'prev': ''
                }
            }
        }
        
        let path = '../../mem/' + this.youtube + '.json';
        const fs = require('fs');
        let json = JSON.stringify(data);
        fs.writeFile(path, json, function (err){
            console.log(err);
        });
    };

    createEntry() {
        let dir = './mem/';
        let path = dir + this.youtube + '.json';

        const fs = require('fs');

        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("created");
        })
        let data = "meme";
        fs.writeFile(path, data, { flag: 'wx' }, function (err) {
            if (err) throw err;
        console.log("It's saved!");
        });
    };
}

let peko = new Vtuber("meme", "meme", "meme","123123");

peko.update()
    .then()
    .catch((error) => {
        console.log("meme");
    });