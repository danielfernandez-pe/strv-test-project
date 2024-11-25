import tap from 'tap';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import AuthRoutes from '../presentation/routes/authRoutes';
import CustomError from '../../../utils/customError';
import { AuthControllerType } from '../domain/controllers/authController';
import { UserDOM } from '../domain/models/userDOM';
import { authErrors } from '../domain/errors/authErrors';
import { clientResponses } from '../presentation/strings/clientResponses';

class MockUser implements UserDOM {
    _id: string;
    email: string;
    password: string;

    constructor(_id: string, email: string, password: string) {
        this._id = _id;
        this.email = email;
        this.password = password;
    }
}

class MockAuthController implements AuthControllerType {
    postRegister(email: string, password: string): Promise<{ user: UserDOM; token: string; }> {
        return new Promise((resolve, reject) => {
            const newUser = new MockUser('1', 'daniel@email.com', '123456');
            resolve({ user: newUser, token: 'fake-token' });
        });
    }

    postLogin(email: string, password: string): Promise<{ user: UserDOM; token: string; }> {
        return new Promise((resolve, reject) => {
            const newUser = new MockUser('1', 'daniel@email.com', '123456');
            resolve({ user: newUser, token: 'fake-token' });
        });
    }
}

const app = express();
app.use(express.json());

const mockAuthController = new MockAuthController();
const authRoutes = new AuthRoutes(mockAuthController)
app.use(authRoutes.router);

tap.test('POST /auth/signUp successful registration', async (t) => {
    const spy = sinon.spy(mockAuthController, 'postRegister');
    const expectedResult = {
        user: {
            id: '1',
            email: 'daniel@email.com',
        },
        token: 'fake-token'
    };

    const response = await request(app)
        .post('/auth/signUp')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 201, 'Response status should be 201');
    t.same(response.body, expectedResult, 'Response body should match the expected result');
    t.ok(spy.calledOnce, 'postRegister should have been called once');
    spy.restore();
    t.end();
});

tap.test('POST /auth/signUp duplicate email', async (t) => {
    const stub = sinon.stub(mockAuthController, 'postRegister').rejects(new CustomError(authErrors.EMAIL_IN_USE));

    const response = await request(app)
        .post('/auth/signUp')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 400, 'Response status should be 400');
    t.equal(response.body.error, clientResponses.AUTH_EMAIL_ALREADY_EXISTS, 'Correct error message');
    t.ok(stub.calledOnce, 'postRegister should have been called once');
    stub.restore();
    t.end();
});