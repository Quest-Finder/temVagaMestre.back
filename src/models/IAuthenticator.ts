import { AuthenticationData } from "./AuthenticationData"


export interface IAuthenticator {
    generateToken ({id}: AuthenticationData): string
    getData (token: string): AuthenticationData
}