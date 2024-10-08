const {userModel} = require("../models/userModel")

class UserDaoMongo {
    constructor() {
        this.model = userModel
    }


async getUsers () {
    return await this.model.find({})
}

async getUser(filter){
    return await this.model.findOne(filter)
}

async createUser(newUser){
    return await  this.model.create(newUser)
}

async updateUser(uid){
    return await this.model.findOneAndUpdate(uid)
}

async deleteUser(uid) {
    return await this.model.findOneAndDelete(uid)
}

}

module.exports = UserDaoMongo