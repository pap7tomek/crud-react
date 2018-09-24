const express = require('express');
const app = express();
const {User} = require('../models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/registration', (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email    
    })
    user.save().then((doc) => {
       res.json(doc); 
    })
});

module.exports = app;