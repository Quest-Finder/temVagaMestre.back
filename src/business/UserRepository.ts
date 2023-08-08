import User, { UserDTO } from "../models/User";

export interface UserRepository {
    createUser(user: UserDTO):Promise<string>
}