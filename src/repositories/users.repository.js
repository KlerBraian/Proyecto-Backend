const UserDto = require("../dto/user.dto");

class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => {
    const users = await this.dao.get()
    const usersDto = users.map(user => new UserDto(user));
    return usersDto}
    getUser = async filter => {
        const user = await this.dao.getBy(filter);
        const userDto = new UserDto(user)
        return userDto
}
    createUser = async newUser => await this.dao.create(newUser) 
    updateUser = async uid => await this.dao.update (uid) 
    deleteUser = async uid => await this.dao.delete (uid)   
}

module.exports = UsersRepository