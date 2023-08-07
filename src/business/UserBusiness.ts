import { IAuthenticator } from "../models/IAuthenticator"
import { IHashManager } from "../models/IHashManager"
import { IIdGenerator } from "../models/IIdGenerator"
import { UserRepository } from "./UserRepository"

export class UserBusiness {
    constructor (
        private userDatabase: UserRepository,
        private hashManager: IHashManager,
        private authenticator: IAuthenticator,
        private idGenerator: IIdGenerator
    ) {}
}