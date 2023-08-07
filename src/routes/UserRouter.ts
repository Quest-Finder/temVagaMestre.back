import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import UserDatabase from "../database/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export const userRouter = express.Router()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(
    userDatabase,
    new HashManager(),
    new Authenticator(),
    new IdGenerator()
)
const userController = new UserController(userBusiness)

userRouter.get("/test", () => console.log("Testando..."))