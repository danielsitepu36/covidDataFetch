// const covid = require('../services/covid.service');
import covidService from '../services/covid.service.js';

async function get(req, res, next) {
  try {
    res.json(await covidService.getAll());
  } catch (err) {
    console.error(`Error while getting covid data`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await covidService.create());
  } catch (err) {
    console.error(`Error while creating covid data`, err.message);
    next(err);
  }
}

const covidController = { get, create };

export default covidController;
