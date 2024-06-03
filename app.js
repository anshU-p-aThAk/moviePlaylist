const express = require('express');
const authroutes = require('./routes/authroutes');
const homeroutes = require('./routes/homeroutes');
const movieroutes = require('./routes/movieRoutes');
const privacyRoutes = require('./routes/privacyRoutes');
const { connectMongoose } = require('./model/user');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Session = require('express-session');
const { initializingPassport } = require('./passportConfig');
require('dotenv').config();


connectMongoose();

initializingPassport(passport);





const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('keyboard cat'));

app.set('trust proxy', 1)

app.use(Session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000000000000 },
}))

app.use(passport.initialize());
app.use(passport.session());



app.use('/', authroutes);
app.use('/', homeroutes);
app.use('/', movieroutes);
app.use('/', privacyRoutes);




app.use(express.static('public'));


app.set('view engine', 'ejs');




app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  }
  else {
    res.render('landing');
  }

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});