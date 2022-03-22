import express from 'express';
import covidController from '../controllers/covid.controller.js';

const router = express.Router();
/* GET covids */
router.get('/', covidController.get);

/* POST covid */
router.post('/', covidController.create);

// module.exports = router;
export default router;
