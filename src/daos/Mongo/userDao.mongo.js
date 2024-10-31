const {userModel} = require("./models/userModel")

class UserDaoMongo {
    constructor() {
        this.model = userModel
    }


async get () {
    return await this.model.find({})
}

async getBy(filter){
    return await this.model.findOne(filter)
}

async create(newUser){
    return await  this.model.create(newUser)
}

async update(uid){
    return await this.model.findOneAndUpdate(uid)
}

async delete(uid) {
    return await this.model.findOneAndDelete(uid)
}

}

module.exports = UserDaoMongo