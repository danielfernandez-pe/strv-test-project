
import tap from 'tap';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import AuthRoutes from '../presentation/routes/authRoutes';
import CustomError from '../../../utils/customError';
import MockAuthController from './mocks/mockAuthController';
import { authErrors } from '../domain/errors/authErrors';
import { clientResponses } from '../presentation/strings/clientResponses';

const app = express();
app.use(express.json());

const mockAuthController = new MockAuthController();
const authRoutes = new AuthRoutes(mockAuthController)
app.use(authRoutes.router);

tap.test('POST /auth/signUp Successful', async (t) => {
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

tap.test('POST /auth/signUp Duplicate email', async (t) => {
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

tap.test('POST /auth/signUp Generic error', async (t) => {
    const stub = sinon.stub(mockAuthController, 'postRegister').rejects(new Error('Generic error'));

    const response = await request(app)
        .post('/auth/signUp')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 500, 'Response status should be 500');
    t.equal(response.body.error, clientResponses.ERROR_GENERIC, 'Correct error message');
    t.ok(stub.calledOnce, 'postRegister should have been called once');
    stub.restore();
    t.end();
});

tap.test('POST /auth/login Successful', async (t) => {
    const spy = sinon.spy(mockAuthController, 'postLogin');

    const expectedResult = {
        user: {
            id: '1',
            email: 'daniel@email.com',
        },
        token: 'fake-token'
    };

    const response = await request(app)
        .post('/auth/login')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 200, 'Response status should be 200');
    t.same(response.body, expectedResult, 'Response body should match the expected result');
    t.ok(spy.calledOnce, 'postLogin should have been called once');
    spy.restore();
    t.end();
});

tap.test('POST /auth/login User not found', async (t) => {
    const stub = sinon.stub(mockAuthController, 'postLogin').rejects(new CustomError(authErrors.USER_NOT_FOUND));

    const response = await request(app)
        .post('/auth/login')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 404, 'Response status should be 404');
    t.equal(response.body.error, clientResponses.ERROR_USER_NOT_FOUND, 'Correct error message');
    t.ok(stub.calledOnce, 'postLogin should have been called once');
    stub.restore();
    t.end();
});

tap.test('POST /auth/login Incorrect password', async (t) => {
    const stub = sinon.stub(mockAuthController, 'postLogin').rejects(new CustomError(authErrors.INCORRECT_PASSWORD));

    const response = await request(app)
        .post('/auth/login')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 401, 'Response status should be 401');
    t.equal(response.body.error, clientResponses.ERROR_INCORRECT_PASSWORD, 'Correct error message');
    t.ok(stub.calledOnce, 'postLogin should have been called once');
    stub.restore();
    t.end();
});

tap.test('POST /auth/login Generic error', async (t) => {
    const stub = sinon.stub(mockAuthController, 'postLogin').rejects(new Error('Generic error'));

    const response = await request(app)
        .post('/auth/login')
        .send({ email: 'daniel@email.com', password: 'password' });
    
    t.equal(response.status, 500, 'Response status should be 500');
    t.equal(response.body.error, clientResponses.ERROR_GENERIC, 'Correct error message');
    t.ok(stub.calledOnce, 'postLogin should have been called once');
    stub.restore();
    t.end();
});