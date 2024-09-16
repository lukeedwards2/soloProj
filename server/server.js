const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./strategies/user.strategy')
const userRouter = require('./routes/user.router');
const betRouter = require('./routes/bet.router');
const app = express();
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);  
app.use('/api/bets', betRouter);  




app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});






const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

