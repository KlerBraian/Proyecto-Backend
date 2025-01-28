const UserDto = require("../dto/user.dto");

class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => {
    const users = await this.dao.get()
    if (!users || users.length === 0) {
        return []; // Si no hay usuarios, devuelve un array vacío
    }
    const usersDto = users.map(user => new UserDto(user));
    return usersDto}
    getUser = async filter => {
        console.log(filter)
        const user = await this.dao.getBy({_id: filter});
        const userDto = new UserDto(user)
        return userDto
}
    createUser = async newUser => await this.dao.create(newUser) 
    updateUser = async uid => await this.dao.update (uid) 
    deleteUser = async uid => await this.dao.delete (uid)   
}

module.exports = UsersRepository