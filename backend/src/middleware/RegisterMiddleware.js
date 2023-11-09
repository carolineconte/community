const { getAll, auth } = require('../Model')

const registerMiddleware = (req, res, next) => {
    const { body } = req

    if (body.name === undefined || body.name === '') {
        return res.status(400).json({ message: 'The name field is required' })
    }

    if (body.email === undefined || body.email === '') {
        return res.status(400).json({ message: 'The email field is required' })
    }

    if (body.password === undefined || body.password === '') {
        return res.status(400).json({ message: 'The password field is required' })
    }

    next()
}

const confEmail = async (req, res, next) => {
    const users = await getAll();
    const { email } = req.body
    const alreadyRegistered = users.find(user => user.email === email)
    if (alreadyRegistered) {
        return res.json({ error: 'already registered user' })
    }
    next()
}

const confPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const authUser = await auth(email);
    if (!authUser) {
        return res.status(404).json({ message: "Usuário não encontrado ou credenciais inválidas" });
    }

    const passLog = authUser[0].password
    const passwordMatch = password === passLog;
    if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
    next()
}

module.exports = {
    registerMiddleware,
    confEmail,
    confPassword
}