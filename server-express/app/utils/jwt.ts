import jwt, { SignOptions } from 'jsonwebtoken'

//sign jwt token
const signJWT = (
    payload: object,
    privateKey: string,
    options?: SignOptions
): string => {
    const signOptions: SignOptions = {
        ...(options ?? {}),
        algorithm: 'RS256',
    }
    return jwt.sign(payload, privateKey, signOptions)
}

//verify jwt token
const verifyJWT = (token: string, publicKey: string): any | null => {
    try {
        return jwt.verify(token, publicKey)
    } catch (error) {
        console.error(error)
        return null
    }
}
export { signJWT, verifyJWT }
