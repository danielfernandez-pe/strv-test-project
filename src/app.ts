import express from 'express';
import initMongo from './init/mongoInit';
import initFirebase from './init/firebaseInit';
import ContactRepository from './features/contacts/data/repositories/contactRepository';
import ContactController from './features/contacts/domain/controllers/contactController';
import ContactRoutes from './features/contacts/presentation/routes/contactRoutes';
import AuthRepository from './features/authentication/data/repositories/authRepository';
import AuthController from './features/authentication/domain/controllers/authController';
import AuthRoutes from './features/authentication/presentation/routes/authRoutes';
import logger from './utils/logger';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const contactRepository = new ContactRepository();
const contactController = new ContactController(contactRepository);
const contactRoutes = new ContactRoutes(contactController);

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);
const authRoutes = new AuthRoutes(authController);

app.use(authRoutes.router);
app.use(contactRoutes.router);

(async () => {
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
})();