export default class CustomError extends Error {
    code: number;

    constructor(code: number) {
        super('');
        this.code = code;
    }
}