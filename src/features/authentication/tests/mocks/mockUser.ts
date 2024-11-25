import UserDOM from '../../domain/models/userDOM';

export default class MockUser implements UserDOM {
    _id: string;
    email: string;
    password: string;

    constructor(_id: string, email: string, password: string) {
        this._id = _id;
        this.email = email;
        this.password = password;
    }
}
