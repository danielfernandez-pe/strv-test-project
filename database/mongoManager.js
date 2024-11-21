import mongoose from 'mongoose';
import logger from '../utils/logger.js';

async function connectMongo() {
    const uri = process.env.DATABASE_DEV_URI;
    await mongoose.connect(uri);
    logger.info('Connection with MongoDB successful');
}

export default connectMongo;