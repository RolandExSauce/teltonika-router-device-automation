import { IHost } from '../app/utils/types'
import { check_and_MAYBE_restore_BACKUP } from './sdk/restore.backup'
import { check_and_MAYBE_upgrade_FIRMWARE } from './middleware-upgrade/upgrade.router'
import { awaitClient } from './tools/onServer.down'
import { pingHost } from './tools/utils'
import { check_and_MAYBE_config_UpgradedRouter } from './sdk/update.router'
import { playDeviceConnected } from './utils/audios'
import { timeout } from './utils/constants'

export const CONFIG_ROUTER = async (hostData: IHost) => {
    const { host } = hostData
    try {
        let res: boolean | undefined
        do {
            res = await pingHost(host)
            if (res) {
                playDeviceConnected()
                const routerNeedUpgrade =
                    await check_and_MAYBE_upgrade_FIRMWARE(hostData)

                //if router need upgrade, then we have to wait for client after firmware start upgrading
                const proceedToBackup = routerNeedUpgrade
                    ? ((await awaitClient(timeout, hostData)) as boolean)
                    : true

                if (proceedToBackup) {
                    await check_and_MAYBE_restore_BACKUP(hostData)
                    await check_and_MAYBE_config_UpgradedRouter(hostData)
                }
                break
            }
        } while (!res)

        return true
    } catch (err) {
        return false
    }
}
