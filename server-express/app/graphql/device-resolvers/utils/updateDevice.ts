import { maybeGenNewPasswords } from "../../../../script/tools/utils";
import { DeviceModel } from "../../../database/schemas/schemas";
import { MutationUpdateAndMaybeConfigDeviceAgainArgs } from "../../generated/generated__types";


// Update router resolver
export const updateDeviceInDB = async (
    _: undefined,
    { updateDeviceInput:
        { wifiSSIDOfDeviceToUpdate, updateInput } }:
        MutationUpdateAndMaybeConfigDeviceAgainArgs
) => {

    const deviceInfo = updateInput?.deviceInfo;
    const deviceFieldsOptional = deviceInfo?.deviceFieldsOptional;
    const maybeGenPws = updateInput?.generateNewCredentials  as boolean;;
    const options = updateInput?.options;

    //gather all passwords in obj together
    const passData = {
        newPassWifi: deviceInfo?.passWifi,
        newPassForWebUser: deviceInfo?.passForWebUser,
        newPassForShellUser: deviceFieldsOptional?.passForShellUser
    }

    //get new passwords or old ones
    const { newPassForShellUser, newPassForWebUser, newPassWifi }
        = maybeGenNewPasswords(passData, maybeGenPws)

    const updatedRouter = await DeviceModel.findOneAndUpdate(
        { wifiSSID: wifiSSIDOfDeviceToUpdate },
        {
            $set: {
                modell: deviceInfo?.modell,
                wifiSSID: deviceInfo?.wifiSSID,
                webUser: deviceInfo?.webUser,
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
            },
        },
        {
            returnOriginal: true,
        }
    );

    if (updatedRouter) {
        return {
            routerUpdateResponse: ROUTER_ALTERED(
                updatedRouter?.routerSSID as string,
                "UPDATE"
            ),
        };
    } else {
        return {
            customError: COULD_NOT_UPDATE_ROUTER,
        };
    }

    return {
        customError: COULD_NOT_UPDATE_ROUTER,
    }
}
