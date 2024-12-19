const { usersMockModel } = require("./models/userMocksMode");

class UsersMockDaoMongo {
    constructor() {
        this.model = usersMockModel
    }


   get   = async () => await this.model.find({});
   create = async newUser => await this.model.insertMany(newUser);
   delete = async opts => await this.model.deleteMany(opts);
}

module.exports = {
    UsersMockDaoMongo
}