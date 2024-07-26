import { IDataConfig } from '../../app/utils/types'
import {
    firmwareFileName,
    lgntFW,
    remote_path_current_firmware_version,
} from '../utils/constants'
import { middleware_hosts } from './clients'

// Determine if an upgrade is needed based on firmware versions
export const getFirmwareVersion_and_CompareCurrentVersion = async (
    Host: IDataConfig
): Promise<boolean> => {
    try {
        const { clientSCP } = await middleware_hosts(Host)

        // Read current firmware version
        const firmwareVersion = (
            await (
                await clientSCP
            ).readFile(remote_path_current_firmware_version)
        ).toString()

        // Trim any leading/trailing whitespaces from the version
        const strippedVersion = firmwareVersion.trim()

        // Extract the last character indicating the current firmware version
        const lastCharCurrentFirmwareVersion = Number(strippedVersion.slice(-1))

        // Extract the last character indicating the version to be uploaded
        const toUploadFirmwareVersion = firmwareFileName.slice(0, lgntFW)
        const lastCharToUploadFirmwareVersion = Number(
            toUploadFirmwareVersion.slice(-1)
        )

        let routerNeedUpgrade: boolean = false

        // Compare firmware versions to determine if an upgrade is necessary
        if (lastCharToUploadFirmwareVersion > lastCharCurrentFirmwareVersion) {
            routerNeedUpgrade = true
        } else if (
            lastCharToUploadFirmwareVersion < lastCharCurrentFirmwareVersion
        ) {
            routerNeedUpgrade = false
        } else {
            routerNeedUpgrade = false
        }

        return routerNeedUpgrade
    } catch (error) {
        console.log(error) // Log any errors that occur during the process
        return false
    }
}
