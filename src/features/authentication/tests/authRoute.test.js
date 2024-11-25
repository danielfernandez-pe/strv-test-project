import request from 'supertest';
import express from 'express';
import authRoutes from '../presentation/routes/authRoutes.js';
import * as authController from '../domain/controllers/authController.js';

const app = express();
app.use(express.json());
app.use(authRoutes);

jest.mock('../domain/controllers/authController.js', () => ({
    postRegister: jest.fn()
}));

describe('POST /auth/signUp', () => {
    it('should register a user and return 201 with user and token', async () => {
        const expectedResult = {
            user: { _id: '1', email: 'daniel@email.com'},
            token: 'fake-token'
        }

        authController.postRegister.mockResolvedValue(expectedResult);

        const response = await request(app)
            .post('/auth/signUp')
            .send({ emai: 'daniel@email.com', password: '123456' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expectedResult);
    });
});