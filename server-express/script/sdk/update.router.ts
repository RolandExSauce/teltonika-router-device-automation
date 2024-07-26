import { changeAdminPW, resetWirelessCommand } from '../utils/commands.linux'
import { IDataConfig } from '../../app/utils/types'
import { middleware_hosts } from '../tools/clients'
import { check_and_MAYBE_createDefaultBackup } from './create.backup'
import { getFirmwareVersion_and_CompareCurrentVersion } from '../tools/firmware.version'
import { DEVICE_PASSWORD_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE } from '../script-constants'

export const check_and_MAYBE_config_UpgradedRouter = async (Host: IDataConfig) => {
    const { newCredentials } = Host
    const newHost = {
        ...Host,
        password: DEVICE_PASSWORD_WHICH_SDK_FILE_WAS_USED_FOR_RESTORE, //swap passwords
    }

    const { clientSSH } = await middleware_hosts(newHost)
    const routerNeedUpgrade =
        await getFirmwareVersion_and_CompareCurrentVersion(newHost)

    if (!routerNeedUpgrade) {
        const CHANGE_ADMIN_PASSWORD = changeAdminPW(
            String(newCredentials?.newPassForWebUser)
        )
        const inputWireless = {
            newSSID: String(newHost.newCredentials?.newPassWifi),
            newWifiPass: String(newCredentials?.newPassWifi),
        }

        try {
            const resetWifiCommand = resetWirelessCommand(inputWireless)
            const sshClient = await clientSSH

            // Change SSID and reset wifi password
            sshClient
                .exec(resetWifiCommand, [], {
                    stream: 'stderr',
                    onStderr: (chunk: { toString: () => any }) => { },
                })
                .catch((err) => { })

            // Change admin password
            sshClient.exec(CHANGE_ADMIN_PASSWORD, []).catch((err) => { })

            // Create default backup
            await check_and_MAYBE_createDefaultBackup(newHost)
        } catch (err) { }
    }
}
