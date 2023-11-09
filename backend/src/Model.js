const connection = require('./connection')

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM users')
    return users
}

const createdUser = async (user) => {
    const { name, email, password, role } = user
    const date = new Date(Date.now()).toDateString()
    const [createdUser] = await connection.execute('INSERT INTO users(name,email,password,created_at,role) VALUES (?,?,?,?,?)', [name, email, password, date, role])
    return createdUser
}

const auth = async (email) => {
    const [authUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email])
    return authUser
}

const deleteUser = async (id) => {
    const deletedUser = await connection.execute('DELETE FROM users WHERE id = ?', [id])
    return deletedUser
}

const updatedUser = async (id, user) => {
    const { name, email, password } = user
    const uppUser = await connection.execute('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id])
    return uppUser
}

const getUserById = async (id) => {
    const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return user;
};

module.exports = {
    getAll,
    createdUser,
    auth,
    deleteUser,
    updatedUser,
    getUserById
}
