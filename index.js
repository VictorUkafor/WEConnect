import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import swaggerUi from 'swagger-ui-express';
import apiRouter from './server/routes/index';
import dbConfig from './server/config/config';
import db from './server/models/index';
import swaggerDocument from './swagger.json';

const config = dbConfig[process.env.NODE_ENV] || dbConfig['development'];
const app = express();
const port = 7000;

app.set('lockAndKeys', config.secret);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (!module.parent){ app.listen(port); }


export default app;