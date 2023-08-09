import { CustomError } from "../errors/CustomError";
import { InvalidEmail, InvalidInput, InvalidPassword, Unauthorized } from "../errors/UserErrors";
import { IAuthenticator } from "../models/IAuthenticator"
import { IHashManager } from "../models/IHashManager"
import { IIdGenerator } from "../models/IIdGenerator"
import { UserInputDTO } from "../models/User";
import { UserRepository } from "./UserRepository"

export class UserBusiness {
    constructor(
        private userDatabase: UserRepository,
        private hashManager: IHashManager,
        private authenticator: IAuthenticator,
        private idGenerator: IIdGenerator
    ) { }

    public createUser = async (user: UserInputDTO): Promise<string> => {
        try {
            if (!user.name || !user.email || !user.password) {
                throw new InvalidInput();
            }
            if (user.password.length <= 6) {
                throw new InvalidPassword();
            }
            if (!user.email.includes("@")) {
                throw new InvalidEmail();
            }

            const id: string = this.idGenerator.generate()

            const password = await this.hashManager.hashGenerator(user.password)

           await this.userDatabase.createUser({
                id: id,
                password: password,
                name: user.name,
                email: user.email
            })
            const token = this.authenticator.generateToken({ id: id })
            return token

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}