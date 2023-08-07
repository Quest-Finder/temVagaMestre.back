import * as bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { IHashManager } from "../models/IHashManager"

dotenv.config()

export class HashManager implements IHashManager {
    public async hashGenerator(text: string): Promise<string> {
        const cost: number = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(cost);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(text, hash);
    }
}
