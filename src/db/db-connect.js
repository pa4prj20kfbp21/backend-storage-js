import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const DEFAULT_CONNECTION_STRING = process.env.DATABASE_URL || 'mongodb://localhost:27017/plant';

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
export default function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}