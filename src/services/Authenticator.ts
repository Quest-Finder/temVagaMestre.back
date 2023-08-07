import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { AuthenticationData } from "../models/AuthenticationData"
import { IAuthenticator } from "../models/IAuthenticator"
import { Unauthorized } from "../errors/UserErrors"

dotenv.config()

export class Authenticator implements IAuthenticator {
    public generateToken = ({id}: AuthenticationData): string => {
        const token = jwt.sign(
            {id},
            process.env.JWT_KEY as string,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
        )

        return token
    }

    public getData = (token: string): AuthenticationData => {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
            return payload
        } catch (err: any) {
            throw new Unauthorized()
        }
    }
}