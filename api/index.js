const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
// const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://seb:oxymore30@cluster0.az94jt6.mongodb.net/todoAPI');
const Users = require('./models/Users');
const TodoList = require('./models/TodoList');
const bcrypt = require('bcrypt');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let cors = require('cors');
const { send } = require('process');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de vérification du token utilisateur
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: 'No authorization header' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Invalid token' });
    }
};

// Fonction de hashage du password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// Fonction de génération de token qui est renvoyer à l'utilisateur
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1y' });
}

// Fonction de refreshToken non utilisée pour l'instant !!!
// function generateRefreshToken(user) {
//     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
// }


// Route REGISTER avec hash du mot de passe et stockage des credentials en base
app.post('/api/register', async (req, res) => {
    const userRegister = await Users.findOne({ username: req.body.username });
    if (userRegister === null) {
        hashPassword(req.body.password).then(res => Users.create({ username: req.body.username, password: res }));
        res.status(200).send('Utilisateur enregistré');
    } else {
        res.status(409).send('Nom d\'utilisatuer indisponible');
    }
})

// Route LOGIN avec verification du username, puis du pwd et renvoie d'un token + _id et username
app.post('/api/login', async (req, res) => {
    const userLogin = await Users.findOne({ username: req.body.username });
    if (userLogin === null) {
        res.status(401).send('Utilisateur non inscrit');
    } else {
        let isMatch = await bcrypt.compare(req.body.password, userLogin.password);
        if (isMatch) {
            const ACCESS_TOKEN = generateAccessToken(req.body);
            res.status(200).send({ _id: userLogin._id, username: userLogin.username, password: userLogin.password, accessToken: ACCESS_TOKEN });
        } else {
            console.log('Nom d\'utilisateur ou mot de passe non reconnus');
            res.status(409).send('Credentials non reconnu')
        }
        // return isMatch;

    }
});

// Route POST Create new task
app.post('/api/tasklist', authenticateJWT, async (req, res) => {
    console.log(req.body)
    await TodoList.create(req.body, (error, item) => {
        if (error) {
            res.send(error);
        } else {
            res.send(item);
        }
    });
});

// Route GET - Récupére toutes les taches de l'utilisateur courant
app.get('/api/tasklist', authenticateJWT, async (req, res) => {
    let globalDbList = await TodoList.find({ 'user_id': req.query.user_id });
    res.send(globalDbList);
})

// Route DELETE
app.delete('/api/tasklist/:id', authenticateJWT, async (req, res) => {
    try {
        await TodoList.deleteOne({ id: req.params.id });
        res.send("Data effacée")
    } catch (error) {
        console.log(error)
    }
});


// Route UPDATE ( un élément )
app.put('/api/tasklist/', authenticateJWT, async (req, res) => {
    try {
        const task = req.body;
        await TodoList.updateOne(
            { id: task.id },
            { name: task.name, area: task.area, priorityLevel: task.priorityLevel })
    } catch (error) {
        res.send('La mise à jour n\'a pas réussie')
    }


});

app.put('/api/tasklist/validated', authenticateJWT, async (req, res) => {
    try {
        const task = req.body
        await TodoList.updateOne(
            { id: task.id },
            { validated: task.validated })
        console.log(task.validated)
    } catch (error) {
        res.send('La mise à jour n\'a pas réussie')
    }


});


app.put('/api/tasklist/updateDetails', authenticateJWT, async (req, res) => {
    try {
        const task = req.body
        await TodoList.updateOne(
            { id: task.id },
            { details: task.details })
        console.log(task.details)
    } catch (error) {
        console.log('La mise à jour des details n\'a pas réussie')
        res.send('La mise à jour n\'a pas réussie')
    }


});


app.listen(port, () => {
    console.log(`Express app listening at https://localhost${port}`);
});