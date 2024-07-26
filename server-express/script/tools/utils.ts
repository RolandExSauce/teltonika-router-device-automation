import ping from 'ping'
import { hostName } from '../script-constants'
import { INewCredentials } from '../../app/utils/types'

//ping host
const pingHost = async () => {
    try {
        const hostStatus = await ping.promise.probe(hostName, { timeout: 1 })
        return hostStatus.alive
    } catch (error) {
        // Handle errors while pinging
        return false
    }
}

//get current date
const currentDate = () => {
    const date = new Date()
    let currentDay = String(date.getDate()).padStart(2, '0')
    let currentMonth = String(date.getMonth() + 1).padStart(2, '0')
    let currentYear = date.getFullYear()
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}` //display as DD-MM-YYYY
    return currentDate
}

//transform date to locale date
export const transformedDate = (date: string | number | Date) => {
    const utcDate = new Date(date);
    const formattedDate = utcDate.toLocaleString('de-AT', {
        timeZone: 'Europe/Vienna',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    const [datePart, timePart] = formattedDate.split(', ');
    const [month, day, year] = datePart.split('.');
    return `${day}.${month}.${year}, ${timePart}`;
}


//generate a random password
const generateRandomPassword = () => {
    const chars =
        '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const passwordLength = 15
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.charAt(randomNumber)
    }
    return password
}

// gen all passwords
const genPasswords = () => {
    const wifiPassword = generateRandomPassword()
    const newUserPassword = generateRandomPassword()
    const rootPassword = generateRandomPassword()
    return [wifiPassword, newUserPassword, rootPassword]
}


//function to generate new credentials based on wether the user wants it or not
const maybeGenNewPasswords = ({ newPassForShellUser, newPassForWebUser, newPassWifi }: INewCredentials,
    genNewCredentials: boolean) => {
    const passwords = genPasswords()
    const newOrOldCredential: INewCredentials =
        genNewCredentials
            ? {
                newPassWifi: passwords[0],
                newPassForWebUser: passwords[1],
                newPassForShellUser: passwords[2]
            }
            : {
                newPassWifi,
                newPassForWebUser,
                newPassForShellUser
            }

    return newOrOldCredential
}


// Match characters until the first underscore, cause in frontend we are adding either DeviceModell_ or CSV_ before the filename
const matcherBeforeFileName = (fileName: string) => fileName.match(/^([^_]*)_/);


export {
    pingHost,
    currentDate,
    genPasswords,
    matcherBeforeFileName,
    maybeGenNewPasswords
}
