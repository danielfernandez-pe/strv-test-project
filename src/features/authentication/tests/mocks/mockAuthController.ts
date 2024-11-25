import MockUser from './mockUser';
import UserDOM from '../../domain/models/userDOM';
import { AuthControllerType } from '../../domain/controllers/authController';

export default class MockAuthController implements AuthControllerType {
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