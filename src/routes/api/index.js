import express from 'express';

const router = express.Router();

import dates from './dates';
router.use('/dates', dates);

import images from './images';
router.use('/images', images);

import imageInfo from './imageInfo';
router.use('/imageinfo', imageInfo);

import objects from './plant-part';
router.use('/plant-parts', objects);

import objectData from './object-data';
router.use('/object-data', objectData);

export default router;