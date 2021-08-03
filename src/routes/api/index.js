import express from 'express';

const router = express.Router();

import dates from './dates';
router.use('/dates', dates);

export default router;