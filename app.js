import createError from 'http-errors';
import express, { json, urlencoded, static as expressStatic } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {router as indexRouter} from './routes/index.js';
import{router as usersRouter} from './routes/users.js';
import {dirname} from 'node:path'
import url from 'node:url';
import session from 'express-session';
export let app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, '/public')));


app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: false
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('404');
});
