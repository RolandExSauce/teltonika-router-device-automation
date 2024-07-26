import { IDataConfig } from '../../app/utils/types'
import { remotePathBackup, remotePathFirmware } from '../utils/constants'
import { middleware_hosts } from './clients'

// Check if firmware file or backup file exists
export const fileExists = async (Host: IDataConfig) => {
    const { clientSCP } = await middleware_hosts(Host)

    try {
        const [pathExistsFirmware, pathExistsBackup] = await Promise.all([
            (await clientSCP).exists(remotePathFirmware),
            (await clientSCP).exists(remotePathBackup),
        ])
        return [pathExistsFirmware, pathExistsBackup]
    } catch (error) {
        // Handle errors here
        console.error('Error checking file existence:', error)
        throw error
    }
}
