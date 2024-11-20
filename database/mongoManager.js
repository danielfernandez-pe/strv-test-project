import mongoose from 'mongoose';
import logger from '../utils/logger.js';

async function connectMongo() {
    const uri = 'mongodb+srv://dfernandezyopla:8FKGRmLIK7Lqsf8S@strv-test-project.ofvpj.mongodb.net/strv?retryWrites=true&w=majority&appName=STRV-test-project';
    await mongoose.connect(uri);
    logger.info('Connection with MongoDB successful');
}

export default connectMongo;