import bcrypt from 'bcrypt';

//get nth index of specific character
export const getPosition = (phrase: string, charOrSymbol: string, nth: number) =>
    phrase.indexOf(charOrSymbol, (phrase.indexOf(charOrSymbol) + nth));

//hash password
export const hashPassword = async (pw: string) => await bcrypt.hash(pw, await bcrypt.genSalt(10))



