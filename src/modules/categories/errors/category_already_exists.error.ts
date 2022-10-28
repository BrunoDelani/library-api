export class CategoryErrorAlreadyExists extends Error {
    private readonly statusCode: number;
    constructor() {
        super()
        this.message = 'Category already exists.';
        this.statusCode = 401;
    }
}