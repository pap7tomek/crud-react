const{mongoPath} = require('./config/config');
const auth = require('./routes/authorization');
const api = require('./routes/api');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '..', 'public');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongoPath, {useNewUrlParser: true});
app.use(cors({credentials: true}));
app.use('/auth', auth.app);
app.use('/api', api.app);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.get('*', (req, res) => {
    res.sendFile('../index.html');
});

app.listen(process.env.PORT || 5000)


