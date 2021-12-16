class Vtubers {
    constructor(agency, keys, value) {
        this.agency = agency
        this.map = new Map()
        this.directory = []
        this.initializeDirectory(keys, value)
    };

    get getAgency() {
        return this.agency
    }

    get getDirectory() {
        return this.directory
    }

    async initializeDirectory(keys, value) {
        const region = keys['region']

        for (const i = 0; i < region.length; i++) {

            const gen = keys['generation'][i]
            for (const u = 0; u < gen.length; u++) {

                const id = value[region[i]][gen[u]]
                for (const v = 0; v < id.length; v++) {
                    const x = new Vtuber(id[v].youtube, id[v].twitter, id[v].hashtag[0])
                    this.directory.push(x)
                }


            }

        }
        
    }
}

let peko = new Agency("hololive", require('../data/keys.json')['keys'][0], require('../data/data.json'))

console.log(peko.getDirectory)

module.exports = {
    Agency
}