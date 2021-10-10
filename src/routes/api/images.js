import express from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// Get is implemented, maybe an API that posts images would be nice.

// TODO: Implement a way to prevent unauthorised access to this method.
router.post('/image', async (req, res) => {
    const { name, date } = req.query;

    if(!req.body) return res.status(HTTP_BAD_REQUEST).send("Missing picture!");
    if(!name) return res.status(HTTP_BAD_REQUEST).send("Missing name query!");
    if(!date) return res.status(HTTP_BAD_REQUEST).send("Missing date query!");

    let directory = path.join(__dirname.replace('src/routes/api', `public/api/images/${date}`));

    
    if(!existsSync(directory)) mkdirSync(directory);

    const contentType = req.rawHeaders.at(req.rawHeaders.length - 1);
    const fileExtension = contentType.slice(contentType.indexOf('/') + 1);

    directory = directory + `/${name}.${fileExtension}`;

    if(existsSync(directory)) {
        return res.status(HTTP_BAD_REQUEST).send(`/${date}/${name}.${fileExtension} already exists.`);
    }

    writeFileSync(directory, req.body);
    
    return res.status(HTTP_CREATED).send(`/${date}/${name}.${fileExtension}`);
})


export default router;