import express from 'express'
import http from'http'
import morgan from 'morgan'
import winston from 'winston'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            json: true
        })
    ]
});

function startServer() {
    const app = express();
    app.use(morgan('combined'));

    app.get('/', (req, res) => {
        logger.info("Hi there !");
        res.status(200).json({});
    });

    const server = http.createServer(app);

    server.listen(3001, () => {
        logger.info("Server listens on 3001");
    });
}

startServer();