import { CustomError } from "./CustomError"

export class Unauthorized extends CustomError {
    constructor () {
        super(401, "Unauthorized user.")
    }
}
export class InvalidInput extends CustomError {
    constructor () {
        super(401, 'Fill in the fields "name", "email" and "password"')
    }
}
export class InvalidPassword extends CustomError {
    constructor () {
        super(401, 'Invalid password, longer than 6 characters')
    }
}
export class InvalidEmail extends CustomError {
    constructor () {
        super(401, 'Invalid email addresss')
    }
}