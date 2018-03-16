import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

if (!module.parent) {
  app.listen(7000, () => {});
}

export default app;
