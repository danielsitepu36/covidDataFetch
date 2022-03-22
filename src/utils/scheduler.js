import axios from 'axios';
import fs from 'fs';
import cron from 'node-cron';

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

function scheduler() {
  console.log('Scheduler Running...');
  cron.schedule('59 23 * * *', () => {
    fetchCovid();
  });
}

export default scheduler;
