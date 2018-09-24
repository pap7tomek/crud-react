const{mongoPath} = require('./config/config');
const auth = require('./routes/authorization');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '..', 'public');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongoPath, {useNewUrlParser: true});
app.use('/auth', auth);

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cors());

app.get('/aaa', (req, res) => {
    res.json({"name":"Johnaaaaaa", "age":31, "city":"New York"});
});

app.listen(process.env.PORT || 5000)


