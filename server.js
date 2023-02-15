const { hash, genSalt } = require('bcrypt');
const express = require('express');
const path = require('path');
const { ConnectToDatabase } = require('./db');
const app = express();
// middlewares
app.use(express.json());
// give access to public folder only (for the client)
app.use(express.static(path.join(__dirname, 'public')));
// connecting to MySQL database
ConnectToDatabase();
// listening and setting up the PORT
const port = process.env.PORT || 8082;
app.listen(port, () => console.log('Listening to localhost:' + port));
// home page request
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// login page request
app.get('/login', (req, res)=> {
    res.sendFile(__dirname + '/public/login.html');
});
// get user by id
app.get('/get-user', async (req, res) => {
    
});