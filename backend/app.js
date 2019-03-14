// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const config = require('./config');
const auth = require('./routes/auth');
const users = require('./routes/admin/user');
const courses = require('./routes/admin/course');
const quizes = require('./routes/admin/quiz');
const course_modules = require('./routes/admin/course_module');
const categories = require('./routes/admin/category');
const static_pages = require('./routes/admin/static_page');
const media = require('./routes/admin/media');
const blogs = require('./routes/admin/blog');
const front_courses = require('./routes/course');
const front_modules = require('./routes/course_module');
const front_quizes = require('./routes/quiz');
const front_users = require('./routes/user');
const front_blogs = require('./routes/blog');
const pages = require('./routes/page');

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
app.use('/api/users', auth);
app.use('/api/admin/users', users);
app.use('/api/admin/courses', courses);
app.use('/api/admin/courses/module', course_modules);
app.use('/api/admin/categories', categories);
app.use('/api/admin/quiz', quizes);
app.use('/api/admin/pages', static_pages);
app.use('/api/admin/media', media);
app.use('/api/admin/blogs', blogs);
app.use('/api/courses', front_courses);
app.use('/api/modules', front_modules);
app.use('/api/quiz/module', front_quizes);
app.use('/api/account/users', front_users);
app.use('/api/pages', pages);
app.use('/api/blogs', front_blogs);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'www')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname , 'www' , 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
