import UserDOM from "../models/userDOM";

export default interface AuthRepositoryType {
    createUser(email: string, password: string): Promise<UserDOM>;
    findUser(email: string): Promise<UserDOM | null>;
}