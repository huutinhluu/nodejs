import express from "express";
import actorRoute from "./router/actor.route.js";
import filmRoute from "./router/film.route.js";
import {logger4js} from "./logger/log.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert {type: 'json'};
import http from "http";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 

const app = express();

// format message log acces
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

app.use(morgan('combined',  { stream: accessLogStream }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/api/actors", actorRoute);
app.use("/api/films", filmRoute);

const server = http.createServer(app);

server.listen(port, () => {
  logger4js.debug(`App listening on port ${port}`);
});
