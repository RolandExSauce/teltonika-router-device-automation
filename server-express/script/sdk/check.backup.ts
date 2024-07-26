import { NodeSSH } from 'node-ssh'
import { COUNT_FILES_CONFIG } from '../utils/commands.linux'
import { IDataConfig } from '../../app/utils/types'

export const backup_was_restored = async ({
    username,
    password,
}: IDataConfig) => {
    const clientSSH = new NodeSSH()
    let fileCountInConfig: number = 0
    try {
        await (
            await clientSSH.connect({
                username,
                password,
            })
        ).exec(COUNT_FILES_CONFIG, [], {
            stream: 'stdout' && 'stderr',
            onStdout: (chunk) => {
                fileCountInConfig = Number(chunk.toString() || '0')
            },
        })

        return fileCountInConfig >= 60
    } catch (error) {
        // Handle connection or execution errors
        return false
    } finally {
        clientSSH.dispose() // Close the SSH connection in the finally block
    }
}
