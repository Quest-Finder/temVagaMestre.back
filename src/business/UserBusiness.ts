import { CustomError } from "../errors/CustomError";
import { Unauthorized } from "../errors/UserErrors";
import { IAuthenticator } from "../models/IAuthenticator"
import { IHashManager } from "../models/IHashManager"
import { IIdGenerator } from "../models/IIdGenerator"
import { UserDTO } from "../models/User";
import { UserRepository } from "./UserRepository"

export class UserBusiness {
    constructor(
        private userDatabase: UserRepository,
        private hashManager: IHashManager,
        private authenticator: IAuthenticator,
        private idGenerator: IIdGenerator
    ) { }

    public createUser = async (user: UserDTO): Promise<string> => {
        try {
            if (!user.name || !user.email || !user.password) {
                throw new CustomError(400, 'Fill in the fields "name", "email" and "password"');
            }
            if (user.password.length <= 6) {
                throw new CustomError(400, 'Invalid password');
            }
            if (!user.email.includes("@")) {
                throw new CustomError(400, "Invalid email address");
            }

            const id: string = this.idGenerator.generate()

            const password = await this.hashManager.hashGenerator(user.password)

            await this.userDatabase.createUser({
                id: id,
                password: password,
                name: user.name,
                email: user.email
            }

            )
            const token = this.authenticator.generateToken({ id: id })
            return token


        } catch (error: any) {
            throw new Unauthorized()
        }
    }
}