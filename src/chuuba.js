class Vtubers {
    constructor(agency, keys, value) {
        this.agency = agency
        this.keys = keys
    };

    get getAgency() {
        return this.agency
    }

    get getDirectory() {
        return this.directory
    }

}

module.exports = Vtubers