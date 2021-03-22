require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('./middlewares/passport-config');

require('./startUp/customJoiValidators');

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_PATH, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(
  cookieSession({
    name: 'auth',
    keys: ['expensemanager'],
    maxAge: 24 * 60 * 60 * 100,
    httpOnly: false,
    // path: "/api",
    // secure: true
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

// parse application/json
app.use(bodyParser.json({ limit: '1mb' }));

// set cross origin headers
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./routes/authenticate'));
app.use('/api/v1', require('./routes/transaction'));
app.use('/api/v1/source', require('./routes/source'));
app.use('/api/v1/category', require('./routes/category'));
app.use('/api/v1/dashboard', require('./routes/dashboard'));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
});

// if (process.env.NODE_ENV === 'production') {
// Static folder
app.use(express.static(path.join(__dirname, '../client/dist')));

//   // Handle SPA
app.get(/.*/, (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);
// }

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
