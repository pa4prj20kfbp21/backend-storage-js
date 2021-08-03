import express from 'express';
import * as models from '../../db/model-2d-daos';
import mongoose from 'mongoose';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

/**
 * A trick to include the check for a valid id in one place, rather than in every single method that needs it.
 * If "next()" is called, the next route below that matches will be called. Otherwise, we just end the response.
 * The "use()" function will match ALL HTTP request method types (i.e. GET, PUT, POST, DELETE, etc).
 */
router.use('/allInfo/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    }
    else {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
});

router.use('/someInfo/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    }
    else {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
});

router.get('/allInfo/:id', async (req, res) => {
    const { id } = req.params;

    const info = await models.eagerRetrieveModel2D(id);
    if (info) res.json(info);
    else res.sendStatus(HTTP_NOT_FOUND);
});

router.get('/someInfo/:id', async (req, res) => {
    const { id } = req.params;

    res.json(await models.retrieveById(id));
});

export default router;