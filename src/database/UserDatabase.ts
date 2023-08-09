import { UserRepository } from "../business/UserRepository"
import { CreateUserDTO } from "../models/User"
import BaseDatabase from "./BaseDatabase"

export default class UserDatabase extends BaseDatabase implements UserRepository {
    TABLE_NAME = "rpg_users"
    public createUser = async (user:CreateUserDTO):Promise<any> => {
        try {
          const create =  await UserDatabase.connection.insert({
               id: user.id,
               name: user.name,
               email: user.email,
               password: user.password
            }).into(this.TABLE_NAME)
           
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
