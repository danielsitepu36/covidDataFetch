import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import covid from './src/routes/covidRoute.js';
import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';

const url = 'mongodb://localhost/CovidDB';
const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
  console.log('Connected...');
});

// app.get('/', function (req, res) {
//   res.status(200).json({ result: 'Success' });
// });

app.use('/covid', covid);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
});

async function fetchCovid() {
  try {
    console.log('Fetching..');
    await axios.post('http://localhost:5000/covid');
    const date = new Date();
    fs.appendFile(
      'log.txt',
      `API Fetch SUCCESS;date:${date} \n`,
      function (err) {
        if (err) throw err;
        console.log('Log Updated');
      }
    );
    console.log('Fetch Success');
  } catch {
    fs.appendFile(
      'log.txt',
      `API Fetch FAILED;date:${date} \n`,
      function (err) {
        if (err) throw err;
        console.log('Log Updated');
      }
    );
    console.log('Fetch Failed');
  }
}

app.listen(5000, function () {
  console.log('Listening on port 5000');
  console.log('Scheduler Running...');
  cron.schedule('59 23 * * *', () => {
    fetchCovid();
  });
});
