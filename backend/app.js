// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const auth = require('./routes/auth');
const users = require('./routes/user');
const courses = require('./routes/course');
const quizes = require('./routes/quiz');
const course_modules = require('./routes/course_module');
const categories = require('./routes/category');
const media = require('./routes/media');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/users', auth);
app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/courses', course_modules);
app.use('/api/categories', categories);
app.use('/api/quiz', quizes);
app.use('/api/media', media);
app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
