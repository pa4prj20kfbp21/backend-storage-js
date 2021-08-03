import express from 'express';
import path from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import connectToDatabase from './db/db-connect';
import { config } from 'dotenv';
import cors from 'cors';

config();

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser and checker.
app.use(express.json());
app.use(cors('*'));

// Setup our routes.
import routes from './routes';
import { execSync } from 'child_process';
app.use('/', routes);

// Make the 'public' folder available statically
app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's 'build' directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}

// Setup the file system for image storage.
const imageStorePath = path.join(__dirname.replace('/src', '/public/api')); 
console.log(imageStorePath)
if(!existsSync(imageStorePath + '/images')){
    mkdirSync(imageStorePath + '/images', 0o744);

    if(process.env.NODE_ENV !== 'production'){
        // Unix command, may not work on Windows. Pull examples to storage.
        execSync(`cp -r ${imageStorePath + '/examples/*'} ${imageStorePath + '/images'}`) 
    }
}

// Start the DB running. Then, once it's connected, start the server.
connectToDatabase()
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));