import {
    SYS_UPGRADE_CREATE_BACKUP,
    changeRootPW,
} from '../utils/commands.linux'
import { backup_was_restored } from './check.backup'
import { middleware_hosts } from '../tools/clients'
import { IDataConfig } from '../../app/utils/types'

export const check_and_MAYBE_createDefaultBackup = async ({
    username,
    password,
    newCredentials,
}: IDataConfig) => {
    const checkBackUpRestored = await backup_was_restored({
        username,
        password,
    })

    //check if backup was restored
    if (checkBackUpRestored) {
        try {
            const { clientSSH } = await middleware_hosts({
                username,
                password,
            })

            const CHANGE_ROOT_PASSWORD = changeRootPW(
                String(newCredentials?.newPassForShellUser)
            )

            // Password change for root
            await (await clientSSH)
                .exec(CHANGE_ROOT_PASSWORD, [])
                .catch((err) => {
                    // Handle password change error for root
                })

            // Create backup
            await (
                await clientSSH
            )
                .exec(SYS_UPGRADE_CREATE_BACKUP, [], {
                    stream: 'stdout' && 'stderr',
                    onStderr: (chunks) => {
                        // Handle backup creation message
                    },
                })
                .catch((err) => {
                    // Handle backup creation error
                })
        } catch (error) {
            // Handle any other errors
        }
    }
}
