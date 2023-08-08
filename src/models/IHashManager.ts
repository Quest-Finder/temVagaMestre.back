export interface IHashManager {
    hashGenerator (plaintext: string): Promise<string>
    compare (plaintex: string, hashtext: string): Promise<boolean>
}