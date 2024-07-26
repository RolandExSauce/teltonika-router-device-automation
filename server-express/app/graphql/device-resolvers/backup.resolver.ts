import { DeviceModel } from '../../database/schemas/schemas'
import path from 'path'
import fs from 'fs'
import json2csv from 'json2csv'
import {
    BACKUP_CREATED,
    DATA_INCONSISTENT,
    ERROR_WHILE_CREATING_BACKUP,
    NO_NEED_TO_CREATE_BACKUP,
    UNKNOWN_ERROR,
} from '../error.custom.messages'
import { GraphqlOperationGeneralResponse } from '../../utils/types'

//file path for backup
const filePathForBackup = path.join(
    __dirname,
    '../../../sourceAndBackup/rut950_data_backup.csv'
)

//count records in csv file
const recordsCountCSV = async (filePathForBackup: string): Promise<number> => {
    let count = 0
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePathForBackup)
            .on('error', reject)
            .on('data', (chunk) => {
                count += chunk.toString().split('\n').length - 1
            })
            .on('end', () => {
                resolve(count)
            })
    })
}

//check backup file state
const csvRecordsState = async () => {
    return fs.existsSync(filePathForBackup)
        ? await recordsCountCSV(filePathForBackup)
        : 0
}

//backup router resolver
const backupDATA = async (
    _: undefined,
    __: undefined
): GraphqlOperationGeneralResponse => {
    const numOfRecordsInCSV = await csvRecordsState()
    const routers = await DeviceModel.find({}) //send query just in case condition resolves to true to avoid unnecessary overload
    if (routers.length > numOfRecordsInCSV) {
        //more data in database than in csv
        //if there are more records in database then csv file, we can create backup
        const csvBackUp = json2csv.parse(routers, { fields: [''] })
        fs.writeFile(filePathForBackup, csvBackUp, (err) => {
            if (err) console.error(err)
        })

        return csvBackUp
            ? { successMsg: BACKUP_CREATED }
            : { customError: ERROR_WHILE_CREATING_BACKUP } //error while attempting to create a backup file
    } else if (routers.length === numOfRecordsInCSV) {
        return { customError: NO_NEED_TO_CREATE_BACKUP }
    } else if (numOfRecordsInCSV > routers.length) {
        return { customError: DATA_INCONSISTENT }
    } else {
        return { customError: UNKNOWN_ERROR }
    }
}

export { recordsCountCSV, backupDATA }
