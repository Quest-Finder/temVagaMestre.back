import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express"
import { UserInputDTO } from "../models/User";

export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    createUser = async (req: Request, resp: Response) => {
        try {
            const { name, email, password } = req.body

            const input: UserInputDTO = {
                name,
                email,
                password
            }

            const token = await this.userBusiness.createUser(input)

            resp.status(200).send(`Token:${token}`)
        } catch (error: any) {
            resp.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}