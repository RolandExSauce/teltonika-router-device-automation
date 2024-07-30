import { maybeGenNewPasswords, transformedDate } from '../../../../script/tools/utils'
import { DeviceModel } from '../../../database/schemas/schemas'
import { DeviceInfo, DeviceFilesForScript } from '../../generated/generated__types'


//add device in DB
export const addDeviceToDB = async (
    { deviceFieldsMust: { modell, passForWebUser, passWifi, webUser, wifiSSID }, deviceFieldsOptional }: DeviceInfo,
    deviceFilesForScript: DeviceFilesForScript,
    genNewCredentials: boolean,
    isBeingConfigured: boolean = false //by default will not be configured
) => {
    //get fields passed by user
    // const {
    //     modell,
    //     wifiSSID,
    //     webUser,
    //     passForWebUser,
    //     passWifi,
    //     //optional information
    //     deviceFieldsOptional,
    // } = deviceInfo

    //device config status
    const configStatus = {
        lastUsedFirmwareFile: deviceFilesForScript.useThisFirmwareFile,
        lastUsedSDKFile: deviceFilesForScript.useThisSDKFile,
        //deviceIsConfigured: true,
        deviceIsConfigured: isBeingConfigured ? true : false,
        importedFromCSV: false,
        lastUpdatedAt: transformedDate(Date.now())
    }

    //gather all passwords in obj together
    const passData = {
        newPassWifi: passWifi,
        newPassForWebUser: passForWebUser,
        newPassForShellUser: deviceFieldsOptional?.passForShellUser
    }

    //get new passwords or old ones
    const { newPassForShellUser, newPassForWebUser, newPassWifi }
        = maybeGenNewPasswords(passData, genNewCredentials)

    //if not, then insert in db
    const createdDevice = new DeviceModel({
        modell,
        wifiSSID,
        webUser,
        passForWebUser: newPassForWebUser,
        passWifi: newPassWifi,

        //optional fields
        deviceFieldsOptional: {
            shellUser: deviceFieldsOptional?.shellUser,
            passForShellUser: newPassForShellUser,
            serialNumber: deviceFieldsOptional?.serialNumber,
            SIMID: deviceFieldsOptional?.SIMID,
            IMEI: deviceFieldsOptional?.IMEI,
            LAN_MAC: deviceFieldsOptional?.LAN_MAC
        },
        configStatus
    })

    console.log("created device: ", createdDevice);
    await createdDevice.save()
    return createdDevice
        ? {
            __typename: 'StatusAfterConfig',
            statusAfterConfig:
                createdDevice.configStatus,
            successMsg: isBeingConfigured ?
                'device configured and added to db' : 'device added to db',
        }
        : {
            __typename: 'GraphqlError',
            customError: 'Error occurred while adding device in DB'
        }
}
