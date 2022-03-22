import Covid from '../models/covid.model.js';
import axios from 'axios';

// GET ALL COVID DATA
async function getAll() {
  const covid = await Covid.find();
  const response = { data: { covid } };
  return response;
}

// CREATE COVID DATA
async function create() {
  const fetchData = await axios.get(
    'https://data.covid19.go.id/public/api/update.json'
  );
  const reqData = fetchData.data.update;
  const additionalData = new Covid({
    penambahan: reqData.penambahan,
    total: reqData.total,
  });
  const resData = await additionalData.save();
  const response = {
    req: { penambahan: reqData.penambahan, total: reqData.total },
    res: { covid: resData },
  };
  return response;
}

// export default router;
const covidService = { getAll, create };

export default covidService;
