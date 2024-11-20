import express from 'express';
import net from 'net';
import connect from './database/mongoManager.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(contactRoutes);

try {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch (error) {
    console.log(error);
    throw error;
}
