import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => { res.send({ message: 'Welcome to the WEConnect app!' }); });

  app.listen(7000, () => {
      console.log('listening on port 7000:. . .');
  });

export default app;