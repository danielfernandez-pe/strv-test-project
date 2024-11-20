import express from 'express';
import connectMongo from './database/mongoManager.js';
import initializeFirebase from './firebase/firebaseManager.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import logger from './utils/logger.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(contactRoutes);

try {
    await connectMongo();
    initializeFirebase();
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    })
} catch (error) {
    logger.fatal(`Error trying to init the app: ${error}`);
    throw error;
}
