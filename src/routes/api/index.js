import express from 'express';

const router = express.Router();

import dates from './dates';
router.use('/dates', dates);

import images from './images';
router.use('/images', images);

export default router;