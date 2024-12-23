import mongoose from 'mongoose';
import logger from '../utils/logger';

async function connectMongo() {
    const dbUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}${process.env.DATABASE_OPTIONS}`;
    await mongoose.connect(dbUri);
    logger.info('Connection with MongoDB successful');
}

export default connectMongo;