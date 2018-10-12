const express = require('express');
const app = express();
const {User} = require('../models/User');
const {Note} = require('../models/Note');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

app.post('/add', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
      if(err) {
        res.json({
          "status":"error"
        })
      } else {
        User.find({username: authData.user.username}).exec().then((result) => {
          const note = new Note({
            idOwner: result[0]._id,
            text: req.body.note,
            isVisible: true
          })
          note.save().then((doc) => {
            console.log(doc);
            res.json({status: "succes"})
          })
        }).catch(() => {
          console.log("wylogowany");
          res.json({status: false, message: "fail"});
        })
      }
    });
});
app.post('/login', (req, res) => {
    User.find({username: req.body.username, password: req.body.password}).exec().then((result) => {
        if(result.length !== 0) {
            const user = {
                username: result[0].username,
                email: result[0].email
            }
            jwt.sign({user}, 'secretkey', { expiresIn: '1000s' }, (err, token) => {
                res.json({ token });
            });
        }else {
            res.sendStatus(403);
        }
    })
});
app.post('/check', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            authData
          });
        }
    });
})
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
       const bearer = bearerHeader.split(' ');
       const bearerToken = bearer[1];
       req.token = bearerToken;
       next();
    }  else {
       res.sendStatus(403);
    }
}

module.exports = {app, verifyToken};