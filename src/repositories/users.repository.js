class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => await this.dao.get()
    getUser= async filter => await this.dao.getBy(filter)
    createUser = async newUser => await this.dao.create(newUser) 
    updateUser = async uid => await this.dao.update (uid) 
    deleteUser = async uid => await this.dao.delete (uid)   
}

module.exports = UsersRepository