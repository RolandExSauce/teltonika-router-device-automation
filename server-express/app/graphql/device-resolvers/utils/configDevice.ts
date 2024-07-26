import { awaitMaybeDeviceNotPlugedOrConnected } from '../../../../script/tools/maybeNotpluggedOrConnected'
import { flashFirmware } from '../../../../script/firmware/update.firmware'
import { restoreAndBackupSDK } from '../../../../script/sdk/update.sdk'
import { updateFirmwareAndSDK } from '../../../../script/updateBoth'
import {
    TOOK_TOO_LONG,
} from '../../error.custom.messages'
import { DeviceInfo, Options } from '../../generated/generated__types'
import { maybeGenNewPasswords } from '../../../../script/tools/utils'


//function to configure router device
export const configDevice = async (
    deviceInfo: Pick<DeviceInfo,
        'webUser' | 'passForWebUser' | 'passWifi' |
        'modell' | 'wifiSSID'>,
    genNewCredentials: boolean,
    { deviceFilesForScript }: Omit<Options, 'kindOfConfig'> // omit kindOfConfig as we don't need it anymore
) => {
    //use only need fields for config
    const {
        modell, //will be needed to find the correct config files
        wifiSSID, //will be needed in case user wants to restore backup, then swap with overriden ssid
        webUser,
        passForWebUser,
        passWifi,
    } = deviceInfo

    //store password data in an object
    const passData = {
        newPassWifi: passWifi,
        newPassForWebUser: passForWebUser,
        newPassForShellUser: String(passForWebUser)
    }

    // generate new passwords based ongenNewCredentials boolean
    const newOrOldCredential = maybeGenNewPasswords(passData, genNewCredentials)
    const hostData = {
        username: webUser,
        password: passForWebUser,
        newOrOldCredential,
    }

    //await for device to connect 
    // const awaitDeviceIsON = await awaitMaybeDeviceNotPlugedOrConnected()
    // if (!awaitDeviceIsON) {
    //     return { customError: TOOK_TOO_LONG } //if 3 min passed and device is not connected
    // }

    //call functions based on the firmware availables
    // updatingDeviceFiles.wantToUseThisFirmwareFile && updatingDeviceFiles.wantToUseThisSDKFile
    //     ? updateFirmwareAndSDK(hostData, modell)
    //     : updatingDeviceFiles.wantToUseThisFirmwareFile && !updatingDeviceFiles.wantToUseThisSDKFile
    //         ? flashFirmware(hostData, updatingDeviceFiles)
    //         : updatingDeviceFiles.wantToUseThisSDKFile && !updatingDeviceFiles.wantToUseThisFirmwareFile
    //             ? restoreAndBackupSDK(hostData)
    //             : null
}
