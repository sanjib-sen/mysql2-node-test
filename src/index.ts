import express from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.listen(port, () =>
  console.log(
    `Server is listening on port ${port}!\nVisit http://localhost:${port}/hello to see a message.`
  )
);
