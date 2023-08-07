import { UserRepository } from "../business/UserRepository"
import BaseDatabase from "./BaseDatabase"

export default class UserDatabase extends BaseDatabase implements UserRepository {
    TABLE_NAME = "rpg_users"
}