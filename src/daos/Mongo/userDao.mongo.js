const { userModel } = require("../Mongo/models/userModel")

class UserDaoMongo {
    constructor() {
        this.model = userModel
    }


   get   = async () => await this.model.find({});
   getBy = async opts => await this.model.findOne(opts);
   create = async newUser => await this.model.create(newUser);
   update = async (opts, elements) => await this.model.findOneAndUpdate(opts, elements);
   delete = async opts => await this.model.deleteOne(opts);
}

module.exports = {
    UserDaoMongo
}