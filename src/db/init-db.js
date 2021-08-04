/**
 * This program should be run in order to populate the database with dummy data for testing purposes.
 */

import mongoose from 'mongoose';
import connectToDatabase from './db-connect';
import { MonitorDates } from './monitor-dates-schema';
import * as dummy from './dummy-data';
import { PlantPart } from './plant-part-schema';
import { ObjectData } from './object-data-schema';
import { BoundingBoxData } from './bounding-box-schema';
import { Model2D } from './model-2d-schema';
import path from 'path';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

main();

async function main() {
    await connectToDatabase();
    console.log('Connected to database!');

    await clearDatabase();

    await addData();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');

    // Setup the file system for image storage.
    const imageStorePath = path.join(__dirname.replace('/src/db', '/public/api')); 
    if(!existsSync(imageStorePath + '/images')){
        mkdirSync(imageStorePath + '/images', 0o744);

        // Unix command, may not work on Windows. Pull examples to storage.
        execSync(`cp -r ${imageStorePath + '/examples/*'} ${imageStorePath + '/images'}`) 
    }
}

async function clearDatabase() {
    let count = 0;
    let result = await PlantPart.deleteMany({});
    count += result.deletedCount;

    result = await ObjectData.deleteMany({});
    count += result.deletedCount;

    result = await BoundingBoxData.deleteMany({});
    count += result.deletedCount;

    result = await Model2D.deleteMany({});
    count += result.deletedCount;

    result = await MonitorDates.deleteMany({});
    count += result.deletedCount;

    console.log(`Cleared database (removed ${count} items).`);
}

async function addData() {

    let result = await PlantPart.insertMany(dummy.plantPart);
    console.log(`Added ${result.length} plant part data to the database.`);

    result = await ObjectData.insertMany(dummy.objectData);
    console.log(`Added ${result.length} object data to the database.`);

    result = await BoundingBoxData.insertMany(dummy.boundingBoxData);
    console.log(`Added ${result.length} bounding box data to the database.`);

    result = await Model2D.insertMany(dummy.model2D);
    console.log(`Added ${result.length} rgb data info to the database.`);

    result = await MonitorDates.insertMany(dummy.monitorDates);
    console.log(`Added ${result.length} monitor dates to the database.`);
}