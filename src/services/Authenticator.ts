import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
interface AuthenticationData {
    id: string;
    role?: string;
}
export class Authenticator {
    public generateToken(input: AuthenticationData,
        expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            {
                expiresIn
            }
        );

        return token;
    }

    public getData(token: string): AuthenticationData {
        const payload = jwt.verify(
            token, process.env.JWT_KEY as string) as any;
        const result = {
            id: payload.id as string,
            role: payload.role as string
        };
        return result;
    }
}