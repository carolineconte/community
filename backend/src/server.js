const express = require('express')
const app = express();
const session = require('express-session');

app.use(express.json())
app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true
}));

const { getAll,
    createdUser,
    auth,
    deleteUser,
    updatedUser,
    getUserById
} = require('./Model')

const connection = require('./connection')
const registerMiddleware = require('./middleware/RegisterMiddleware')


require('dotenv').config()
const PORT = process.env.PORT


app.get('/community', async (req, res) => {
    const users = await getAll();

    res.json(users)
})

app.post('/register', registerMiddleware.confEmail, registerMiddleware.registerMiddleware, async (req, res) => {
    const newUser = await createdUser(req.body);
    res.json(newUser)
})
app.get('/register', async (req, res) => {
    const { email } = req.body;
    const authUser = await auth(email);
    return res.json(authUser)
})

app.post('/login', registerMiddleware.confPassword,async (req, res) => {
    const { email, password } = req.body;
    const authUser = await auth(email);

    req.session.user = { id: 1, username: 'usuario1' };
   
    return res.json(authUser)
})

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;

    const userID = await getUserById(id)
    res.json(userID)
})

app.delete('/profile/:id', async (req, res) => {
    const { id } = req.params
    await deleteUser(id)
    return res.status(204).json()
})

app.put('/profile/:id', registerMiddleware.registerMiddleware, async (req, res) => {
    const { id } = req.params

    await updatedUser(id, req.body)
    return res.status(204).json()
})


app.post('/logout', (req, res) => {
    // Limpar a sessão, remover tokens, ou realizar ações de logout necessárias
    // Por exemplo, se estiver usando sessions com express-session, você pode usar req.session.destroy() para limpar a sessão
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: "Erro ao fazer logout" });
        } else {
            res.json({ message: "Logout bem-sucedido" });
        }
    });
 
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na port ${PORT}`);
})

