import express from 'express';
import * as parts from '../../db/plant-part-daos';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_UNAUTHORISED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();


/**
 * A trick to include the check for a valid id in one place, rather than in every single method that needs it.
 * If "next()" is called, the next route below that matches will be called. Otherwise, we just end the response.
 * The "use()" function will match ALL HTTP request method types (i.e. GET, PUT, POST, DELETE, etc).
 */
// router.use('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     if (mongoose.isValidObjectId(id)) {
//         next();
//     }
//     else {
//         res.status(HTTP_BAD_REQUEST)
//             .contentType('text/plain').send('Invalid ID');
//     }
// });

router.get('/query', async (req, res) => {

    // Uncomment this code if you want to introduce an artificial delay.
    // setTimeout(async () => {
    //     res.json(await todosDao.retrieveAllTodos());
    // }, 2000);

    // Comment this code if you want to introduce an artificial delay.
    const validObjects = ["fruits"];
    const { itemType } = req.query;

    if(itemType){
        if(validObjects.includes(itemType)){
            res.json(await parts.retrieveByObjectType("tomato"));
        }else{
            res.status(HTTP_BAD_REQUEST).send("Invalid query.");
        }
    }
    else{
        res.sendStatus(HTTP_BAD_REQUEST);
    }
});

router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    const part = await parts.retrieveById(id);

    if (part) res.json(part);
    else res.sendStatus(HTTP_NOT_FOUND);
});

// TODO: Implement a security feature to limit unauthorised creation.
router.post('/create', async (req, res) => {
    const { name, date } = req.query;
    if(name && name.length > 0){
        const item = Number.parseInt(date) > -1 ? await parts.createPlantPartWithDate(name, date) : await parts.createPlantPart(name);
        const easyId = item.EasyId;
        return res.status(HTTP_CREATED).send(`${easyId}`);
    }

    return res.status(HTTP_BAD_REQUEST).send('No name supplied.');
});

export default router;