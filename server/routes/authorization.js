const express = require('express');
const app = express();
const {User} = require('../models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/registration', (req, res) => {
    let error = false;
    let errorM = "";
    User.find({username: req.body.username}).exec().then((result) => {
        if(result.length > 0){
            error = true;
            errorM = "Change username";
            throw error;
        }
        return User.find({email:req.body.email}).exec()
    }).then((result2) => {
        if(result2.length > 0){
            error = true;
            errorM = "E-mail exists";
            throw error;
        }
    }).then(() => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email    
        })
        user.save().then((doc) => {
           res.json({status: true, message: "Nice to meet you"}); 
        })
    })
    .catch(() => {
        res.json({status: false, message: errorM});
    })
});

module.exports = app;