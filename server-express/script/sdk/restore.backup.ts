import { check_and_MAYBE_upload_BACKUP } from './backup.upload'
import { middleware_hosts } from '../tools/clients'
import { getFirmwareVersion_and_CompareCurrentVersion } from '../tools/firmware.version'
import { IDataConfig } from '../../app/utils/types'
import { SYS_UPGRADE_RESTORE_BACKUP } from '../utils/commands.linux'

export const check_and_MAYBE_restore_BACKUP = async (Host: IDataConfig) => {
    // Check and upload backup if necessary
    await check_and_MAYBE_upload_BACKUP(Host)

    // Check if the router needs an upgrade based on firmware versions
    const routerNeedUpgrade =
        await getFirmwareVersion_and_CompareCurrentVersion(Host)
    // Only restore backup after firmware is already upgraded
    if (!routerNeedUpgrade) {
        const { clientSSH } = await middleware_hosts(Host)
        await clientSSH
            .exec(SYS_UPGRADE_RESTORE_BACKUP({
                subfolder: '',
                fileName: ''
            }), [])
            .catch(async (err) => {
                // Error will include "Restoring config files"
            })
    } else {
        // Backup already available, no action needed
    }
}
