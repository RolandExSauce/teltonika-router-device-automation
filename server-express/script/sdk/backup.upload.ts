import { localPathBackup, remotePathBackup } from '../utils/constants'
import { fileExists } from '../tools/check.files'
import { middleware_hosts } from '../tools/clients'
import { IDataConfig } from '../../app/utils/types'

// Check and upload the backup file if needed
export const check_and_MAYBE_upload_BACKUP = async (Host: IDataConfig) => {
    const [, backupExists] = await fileExists(Host)
    if (!backupExists) {
        const { clientSCP } = await middleware_hosts(Host)
        try {
            await (
                await clientSCP
            ).uploadFile(localPathBackup, remotePathBackup)
            // Backup file uploaded successfully
        } catch (error) {
            console.error('Error uploading backup:', error)
            throw error // Propagate the error up
        } finally {
            ;(await clientSCP).close()
        }
    }
}
