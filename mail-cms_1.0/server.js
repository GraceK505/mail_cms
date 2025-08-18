require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./apiRouter');
const emailRouter = require("./emailRouter")
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use('/api', apiRouter);
app.use('/api', emailRouter);

app.listen(port, () => {
  console.log(`MJML server running at http://localhost:${port}`);
});
