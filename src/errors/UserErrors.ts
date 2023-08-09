import { CustomError } from "./CustomError"

export class Unauthorized extends CustomError {
    constructor () {
        super(401, "Unauthorized user.")
    }
}
export class InvalidInput extends CustomError {
    constructor () {
        super(422, 'Fill in the fields "name", "email" and "password"')
    }
}
export class InvalidPassword extends CustomError {
    constructor () {
        super(422, 'Invalid password, shorter than 6 characters')
    }
}
export class InvalidEmail extends CustomError {
    constructor () {
        super(422, 'Invalid email addresss')
    }
}
