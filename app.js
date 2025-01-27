import createError from 'http-errors';
import express, { json, urlencoded, static as expressStatic } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {router as indexRouter} from './routes/index.js';
import{router as usersRouter} from './routes/users.js';
import{router as tchatRouter} from './routes/tchat.js';
import{router as productRouter} from './routes/products.js';
import{router as orderRouter} from './routes/orders.js';
import {dirname} from 'node:path'
import tchatSocketio  from './core/socket_server.js';
import { createServer } from "http";
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

const httpServer = createServer(app);
httpServer.listen(8080);

app.use("/socketio/",tchatSocketio(httpServer));

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: false
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tchat', tchatRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  console.error('page 404='+req.url) 
  res.render('404');

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error('ERROR') 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
