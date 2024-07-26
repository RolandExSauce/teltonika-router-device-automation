import { DeviceModell, UpdateDeviceFiles } from '../app/graphql/generated/generated__types'
import { IDataConfig } from '../app/utils/types'
import { flashFirmware } from './firmware/update.firmware'
import { restoreAndBackupSDK } from './sdk/update.sdk'

export const updateFirmwareAndSDK = async (data: IDataConfig, modell: DeviceModell, files: UpdateDeviceFiles) => {
    //do both configurations
    await flashFirmware(data, files)
    await restoreAndBackupSDK(data)
}
