// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const auth = require('./routes/auth');
const users = require('./routes/admin/user');
const courses = require('./routes/admin/course');
const quizes = require('./routes/admin/quiz');
const course_modules = require('./routes/admin/course_module');
const categories = require('./routes/admin/category');
const static_pages = require('./routes/admin/static_page');
const media = require('./routes/admin/media');
const front_courses = require('./routes/course');
const front_modules = require('./routes/course_module');

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
app.use('/api/courses/module', course_modules);
app.use('/api/categories', categories);
app.use('/api/quiz', quizes);
app.use('/api/pages', static_pages);
app.use('/api/media', media);
app.use('/api/course', front_courses);
app.use('/api/course/module', front_modules);
app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
