import express from 'express';

const router = express.Router();

import dates from './dates';
router.use('/dates', dates);

import images from './images';
router.use('/images', images);

import imageInfo from './imageInfo';
router.use('/imageinfo', imageInfo);

export default router;