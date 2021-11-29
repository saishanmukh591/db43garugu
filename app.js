var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Part = require("./models/part");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var partsRouter = require('./routes/parts');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      Account.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }));


  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());
// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parts', partsRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connectionString = process.env.MONGO_CON

mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
 await Part.deleteMany();


 var results = [{"part_name":"back case","size":'1',"cost":20},
                {"part_name":"lid","size":'4',"cost":25},
                {"part_name":"outer cover", "size":'4',"cost":15}]

for(i in results){
  let instance = new  Part({part_name: results[i]["part_name"], size: results[i]["size"], cost:results[i]["cost"]});
  instance.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("object added.")
    });
}

}

let reseed = true;
if (reseed) { recreateDB();}

module.exports = app;
