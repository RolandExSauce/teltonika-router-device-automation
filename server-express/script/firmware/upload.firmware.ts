import { remotePathFirmware, localPathFirmware } from '../utils/constants'
import { fileExists } from '../tools/check.files'
import { middleware_hosts } from '../tools/clients'
import { getFirmwareVersion_and_CompareCurrentVersion } from '../tools/firmware.version'
import { IDataConfig } from '../../app/utils/types'

// Upload the firmware if needed
export const check_and_MAYBE_upload_FIRMWARE = async (Host: IDataConfig) => {
    const [firmwareExists] = await fileExists(Host)
    const routerNeedUpgrade =
        await getFirmwareVersion_and_CompareCurrentVersion(Host)
    // Check if firmware file exists and if router needs an upgrade
    if (!firmwareExists && routerNeedUpgrade) {
        const { clientSCP } = await middleware_hosts(Host)
        try {
            await (
                await clientSCP
            ).uploadFile(localPathFirmware, remotePathFirmware)
            // Firmware file uploaded successfully
        } catch (error) {
            console.error('Error uploading firmware:', error)
            throw error // Propagate the error up
        } finally {
            ;(await clientSCP).close()
        }
    }
}
