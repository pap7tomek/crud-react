const express = require('express');
const app = express();
const {User} = require('../models/User');
const {Note} = require('../models/Note');
const {verifyToken} = require('./authorization');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const translate = require('translate-google');
app.use(bodyParser.json());

app.post('/add', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
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
          res.json({status: "success", data: doc});
        })
      }).catch(() => {
          res.json({status: "error"});
      })
    }
  });
});
app.post('/all', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.json({
        "status":"error"
      })
    } else {
      User.find({username: authData.user.username}).exec().then((result) => {
        const idOwner = result[0]._id.str;
        Note.find({idOnwer: idOwner}).then((doc) => {
          res.json({status: "success" , data: doc});
        })
      }).catch(() => {
          res.json({status: "error"});
      })
    }
  });
});
app.post('/delete', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.json({
        "status":"error"
      })
    } else {
      User.find({username: authData.user.username}).exec().then((result) => {
        const idOwner = result[0]._id;
        const _id = req.body._id;
        return Note.find({_id: _id, idOwner: idOwner}).deleteOne().exec();
      }).then(
        res.json({
          "status":"success"
        })
      )
      .catch(() => {
          res.json({status: "error"});
      })
    }
  });
})
app.post('/edit', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.json({
        "status":"error"
      })
    } else {
      User.find({username: authData.user.username}).exec().then((result) => {
        const idOwner = result[0]._id;
        const _id = req.body._id;
        return Note.findOneAndUpdate({_id: _id}, {$set: {text: req.body.text}}).exec();
      }).then((result2)=>
        res.json({
          "status":"success"
        })
      )
      .catch(() => {
          res.json({status: "error"});
      })
    }
  });
})

app.post('/translate', verifyToken, (req, res) => {
  const text = req.body.text;
  console.log(text);
  translate(text, {from: 'en', to: 'pl'}).then(response => {
    console.log(response);
    res.json({
      "text": response
    });
  }).catch(err => {
    console.log("dupa");
    res.json({
      "text": err
    })
  })
})
module.exports = {app, verifyToken};