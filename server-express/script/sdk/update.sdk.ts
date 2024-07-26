import { IDataConfig } from '../../app/utils/types'
import { check_and_MAYBE_restore_BACKUP } from './restore.backup'
import { pingHost } from '../tools/utils'
import { check_and_MAYBE_config_UpgradedRouter } from './update.router'
import { playDeviceConnected } from '../utils/audios'

//function restore sdk from a file and backup after new configuration
export const restoreAndBackupSDK = async (hostData: IDataConfig) => {
    try {
        let res: boolean | undefined
        do {
            res = await pingHost()
            if (res) {
                playDeviceConnected()
                await check_and_MAYBE_restore_BACKUP(hostData)
                await check_and_MAYBE_config_UpgradedRouter(hostData)
                break
            }
        } while (!res)

        return true
    } catch (err) {
        return false
    }
}
