import express from 'express';
import initMongo from './init/mongoInit.js';
import initFirebase from './init/firebaseInit.js';
import authRoutes from './src/authentication/presentation/routes/authRoutes.js';
import contactRoutes from './src/contacts/presentation/routes/contactRoutes.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(contactRoutes);

try {
    await initMongo();
    initFirebase();
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    })
} catch (error) {
    logger.fatal(`Error trying to init the app: ${error}`);
    throw error;
}
