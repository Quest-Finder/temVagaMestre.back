import { CreateUserDTO } from "../models/User";

export interface UserRepository {
    createUser(user: CreateUserDTO):Promise<string>
}
