import express from 'express';
import Covid from '../models/covid.js';
import axios from 'axios';

const router = express.Router();

// GET ALL COVID DATA
router.get('/', async (req, res, next) => {
  try {
    const covid = await Covid.find();
    const response = { data: { covid } };
    res.status(200).json(response);
    // res.send('GET REQUEST');
  } catch (err) {
    // res.send('Error' + err);
    next(err);
  }
});

// CREATE COVID DATA
router.post('/', async (req, res, next) => {
  try {
    const fetchData = await axios.get(
      'https://data.covid19.go.id/public/api/update.json'
    );
    const reqData = fetchData.data.update;
    // console.log(reqData);
    // if (!reqData.covid) {
    //   await Promise.reject(new Error('Body Not found'));
    // }
    const additionalData = new Covid({
      penambahan: reqData.penambahan,
      total: reqData.total,
      // penambahan: {
      //   jumlah_positif: 123,
      //   jumlah_meninggal: 456,
      //   jumlah_sembuh: 234,
      //   jumlah_dirawat: 123,
      //   tanggal: '2022-01-01',
      //   created: '2022-01-01',
      // },
      // total: {
      //   jumlah_positif: 123,
      //   jumlah_meninggal: 456,
      //   jumlah_sembuh: 234,
      //   jumlah_dirawat: 123,
      // },
    });
    const resData = await additionalData.save();
    const response = {
      req: { penambahan: reqData.penambahan, total: reqData.total },
      res: { covid: resData },
    };
    res.status(200).json(response);
  } catch (err) {
    // res.send('Error' + err);
    next(err);
  }
});

// module.exports = router;
export default router;
