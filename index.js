import models from 'models';
import db from 'server/db';
import app from 'server/boot';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);
app.get('/', (req, res) => { res.send({ message: "You're welcome!" }); });

if (!module.parent) {
  app.listen(7000, () => {
    // console.log('listening on port 7000:. . .');
  });
}

export default app;
