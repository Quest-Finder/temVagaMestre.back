import { v4 } from "uuid"
import { IIdGenerator } from "../models/IIdGenerator"

export class IdGenerator implements IIdGenerator {
    generate(): string {
        return v4()
    }
}