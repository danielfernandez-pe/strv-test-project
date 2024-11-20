import express from 'express';
import net from 'net';
import connect from './database/mongoManager.js';
import authRoutes from './routes/authRoutes.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(authRoutes);

try {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch (error) {
    console.log(error);
}
