import { DeviceConfigStatus } from "../generated/generated__types";
import { addDeviceToDB } from "./utils/addToDB";
import { configDevice } from "./utils/configDevice";

const handleConfigAndDBUpdate = async (
    deviceInfo: any,
    options: any,
    generateNewCredentials: boolean,
    updateExisting: boolean
) => {
    const resConfig = await configDevice(deviceInfo, generateNewCredentials, options) as any;
    const resDB = updateExisting
        ? await configAndUpdateExistingDeviceInDB(deviceInfo, options.deviceFilesForScript, generateNewCredentials, true) as any
        : await addDeviceToDB(deviceInfo, options.deviceFilesForScript, generateNewCredentials, true) as any;

    if (resDB.successfull) {
        return {
            successMsg: 'Device configured successfully',
            statusAfterConfig: null, // or maybe set to undefined
            __typename: 'StatusAfterConfig',
        };
    }
    return {
        customError: 'Failed to configure and add device to DB',
        __typename: 'GraphqlError',
    };
};

const handleOnlyConfig = async (
    deviceInfo: any,
    options: any,
    generateNewCredentials: boolean
) => {
    const resConfig = await configDevice(deviceInfo, generateNewCredentials, options) as any;
    if (resConfig.successfull) {
        return {
            successMsg: 'Device configured successfully',
            statusAfterConfig: null, // or maybe set to undefined
            __typename: 'StatusAfterConfig',
        };
    }
    return {
        customError: 'Failed to configure device',
        __typename: 'GraphqlError',
    };
};

const handleOnlyDBUpdate = async (
    deviceInfo: any,
    options: any,
    generateNewCredentials: boolean
) => {
    const resDB = await addDeviceToDB(deviceInfo, options.deviceFilesForScript, generateNewCredentials);
    if (resDB.__typename === 'StatusAfterConfig') {
        return {
            successMsg: resDB.successMsg as string,
            statusAfterConfig: resDB.statusAfterConfig as DeviceConfigStatus,
            __typename: 'StatusAfterConfig',
        };
    } else {
        return {
            customError: resDB.customError as string,
            __typename: 'GraphqlError',
        };
    }
};


function configAndUpdateExistingDeviceInDB(deviceInfo: any, deviceFilesForScript: any, generateNewCredentials: boolean, arg3: boolean): any {
    throw new Error("Function not implemented.");
}


export { handleConfigAndDBUpdate, handleOnlyConfig, handleOnlyDBUpdate }
// const configOrReconfig = async (
//     deviceInfo: any,
//     options: any,
//     generateNewCredentials: boolean,
//     configAgain: boolean
// ): Promise<any> => {
//     const option1 = options.kindOfConfig === 'Option1'; // config then add/update device in database
//     const option2 = options.kindOfConfig === 'Option2'; // only configure device
//     const option3 = options.kindOfConfig === 'Option3'; // add device to db only

//     if (configAgain) {
//         if (option1) {
//             return handleConfigAndDBUpdate(deviceInfo, options, generateNewCredentials, true);
//         } else if (option2) {
//             return handleOnlyConfig(deviceInfo, options, generateNewCredentials);
//         } else if (option3) {
//             return handleOnlyDBUpdate(deviceInfo, options, generateNewCredentials);
//         }
//     } else {
//         if (option1) {
//             return handleConfigAndDBUpdate(deviceInfo, options, generateNewCredentials, false);
//         } else if (option2) {
//             return handleOnlyConfig(deviceInfo, options, generateNewCredentials);
//         } else if (option3) {
//             return handleOnlyDBUpdate(deviceInfo, options, generateNewCredentials);
//         }
//     }

//     return {
//         customError: 'Invalid Config Option',
//         __typename: 'GraphqlError',
//     };
// };
