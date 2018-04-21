import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import apiRouter from './server/routes/index';

const app = express();
const port = 7000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', apiRouter);

if(!module.parent){ app.listen(port); }
        
export default app;