export let app = express();
import express, { json, urlencoded, static as expressStatic } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {router as indexRouter} from './routes/index.js';
import{router as usersRouter} from './routes/users.js';
import{router as tchatRouter} from './routes/tchat.js';
import{router as productRouter} from './routes/products.js';
import{router as orderRouter} from './routes/orders.js';
import{router as messageRouter} from './routes/messages.js';
import{router as deliveryRouter} from './routes/delivery.js';
import {dirname} from 'node:path'
import tchatSocketio  from './core/socket_server.js';
import { createServer } from "http";
import url from 'node:url';
import session from 'express-session';
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import jwt from 'jsonwebtoken';

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
  secret: 'kflzmd7e54',
  resave: false,
  saveUninitialized: false
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tchat', tchatRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/messages', messageRouter);
app.use('/delivery-tours', deliveryRouter);
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TP API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mahora Grolleau",
        url: "",
        email: "mahora.grolleau@my-digital-school.org",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "http://mahora.grolleau.angers.mds-project.fr:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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

/**
 * Generate JWT token
 * @param {string} username - user login
 * @returns {string}
 */
export function generateAccessToken(username) {
  return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

/**
 * Vérify token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']

  if (authHeader == null) return res.sendStatus(401)

  jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function JSONtoXML(obj) {
  let xml = '';
  for (let prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
    if (obj[prop] instanceof Array) {
      for (let array in obj[prop]) {
        xml += '\n<' + prop + '>\n';
        xml += JSONtoXML(new Object(obj[prop][array]));
        xml += '</' + prop + '>';
      }
    } else if (typeof obj[prop] == 'object') {
      xml += JSONtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : '</' + prop + '>\n';
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
}