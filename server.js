const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// creating session ID 'secret'
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));

// Serve the login page
app.get('/', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
      <div>
        <label>Username:</label>
        <input type="text" name="username">
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password">
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  `);
});

// Handle the login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if the username and password are correct
  if (username === 'admin' && password === 'password') {
    // Set a session variable to indicate that the user is logged in
    req.session.isLoggedIn = true;
    res.redirect('/home');
  } else {
    res.send('Invalid username or password');
  }
});

// Serve the home page
app.get('/home', (req, res) => {
  // Check if the user is logged in
  if (req.session.isLoggedIn) {
    res.send('<h1>Welcome to the home page</h1>');
  } else {
    res.redirect('/');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
