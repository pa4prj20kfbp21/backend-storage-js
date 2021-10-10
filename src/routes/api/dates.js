import express from 'express';
import * as dates from '../../db/monitor-dates-daos';
import mongoose from 'mongoose';
import { ObjectData } from '../../db/object-data-schema';
import { BoundingBoxData } from '../../db/bounding-box-schema';
import { Model2D } from '../../db/model-2d-schema';
import { MonitorDates } from '../../db/monitor-dates-schema';

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
router.use('/id/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    }
    else {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
});

router.use('/envRef/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        next();
    }
    else {
        res.status(HTTP_BAD_REQUEST)
            .contentType('text/plain').send('Invalid ID');
    }
});

router.get('/', async (req, res) => {

    // Uncomment this code if you want to introduce an artificial delay.
    // setTimeout(async () => {
    //     res.json(await todosDao.retrieveAllTodos());
    // }, 2000);

    // Comment this code if you want to introduce an artificial delay.
    res.json(await dates.lazyRetrieveAllMonitorDates());
});

router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    const date = await dates.trimmedRetrieveById(id);

    if (date) res.json(date);
    else res.sendStatus(HTTP_NOT_FOUND);
});

router.get('/envRef/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) res.sendStatus(HTTP_BAD_REQUEST);
    const date = await dates.retrieveByEnvironmentReference(id);

    if (date) res.json(date);
    else res.sendStatus(HTTP_NOT_FOUND);
});

// TODO: Move majority of the format creation to monitor-dates-daos.
router.post('/entry', async (req, res) => {
    const jsonBody = req.body;
    let listObjectData = [];
    let listBoundingBox = [];
    let listRGBImage = [];

    try{
        /*
            Assume the format input has a generic body of:
            {
                Date: 134354354, //preferably in UNIX epoch time.
                Name: “String”, //can be any string.
                EnvironmentConditions: { A JSON of any format },
                RGBImages: [ List of RGBImage data ]
            }
        */
        let localRGBImage = []; // Add to MonitorDate schema.
        for(const rgbImage of jsonBody.RGBImages){
            /*
                Assume the format input for a member of RGBImages:
                {
                    ImageURL: “/link”,
                    BoundingBoxes: [ List of BoundingBoxes ]
                }
            */
            let localBoundingBoxes = []; // Add to RGB Image.
            
            for(const bbox of rgbImage.BoundingBoxes){
                /*
                    Assume the format input for a member of BoundingBoxes:
                    {
                        X: 69,
                        Y: 420,
                        Height: 6969,
                        Width: 42,
                        Color: “Green”,
                        ObjectId: "id"
                    }
                */
                const bboxData = new BoundingBoxData({
                    X:bbox.X,
                    Y:bbox.Y,
                    Height:bbox.Height,
                    Width:bbox.Width,
                    Color:bbox.Color,
                    ObjectID: bbox.ObjectId
                });

                localBoundingBoxes.push(bboxData._id); // To be added as list of ObjectId for RGBImage.
                listBoundingBox.push(bboxData);
            }
            
            const rgbEntry = new Model2D({ImageURL: rgbImage.ImageURL, BoundingBoxes: localBoundingBoxes});
            localRGBImage.push(rgbEntry._id); // To be added as list of ObjectId for MonitorDates.
            listRGBImage.push(rgbEntry);
        }

        // Push environment conditions 
        const envConditions = new ObjectData({Data: jsonBody.EnvironmentConditions});
        listObjectData.push(envConditions);

        const monitorDate = new MonitorDates({
            MonitorDate: jsonBody.Date || Date.now(),
            Name: jsonBody.Name,
            EnvironmentConditions: envConditions._id,
            RGBImages: localRGBImage
        });

        await ObjectData.insertMany(listObjectData);
        await BoundingBoxData.insertMany(listBoundingBox);
        await Model2D.insertMany(listRGBImage);
        await MonitorDates.insertMany(monitorDate);

        res.status(HTTP_CREATED).send(monitorDate._id);
    }catch(err){
        res.status(HTTP_BAD_REQUEST).send(err);
    }
});

export default router;