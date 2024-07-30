import { DeviceModel } from '../../database/schemas/schemas';
import {
    ConfiguredDeviceResult, Device, DeviceConfigStatus,
    MutationConfigAndMaybeAddDeviceInDbArgs
} from '../generated/generated__types';
import { handleConfigAndDBUpdate, handleOnlyConfig, handleOnlyDBUpdate } from './config.kind';
import { addDeviceToDB } from './utils/addToDB';
import { configDevice } from './utils/configDevice';


// config router resolver
export const configAndMaybeAddDeviceInDB = async (
    _: undefined,
    { deviceConfigInput: {
        deviceInfo,
        generateNewCredentials,
        options,
        configAgain
    } }: MutationConfigAndMaybeAddDeviceInDbArgs
): Promise<any> => {
    // ): Promise<ConfiguredDeviceResult | undefined> => {

    try {
        await addDeviceToDB(deviceInfo, options.deviceFilesForScript, generateNewCredentials);
    }
    catch (err) {
        console.log("err happened: ", err)
    }

    try {
        const option1 = options.kindOfConfig === 'Option1'; //Option 1, config then add/update device in database
        const option2 = options.kindOfConfig === 'Option2'; // Option 2 selected, only configure device
        const option3 = options.kindOfConfig === 'Option3'; // Option 3 selected, add device to db only

        const existingDevice = await DeviceModel.findOne({ wifiSSID: deviceInfo.deviceFieldsMust.wifiSSID }) as Device;
        // If device exists already in db, prompt user for confirmation
        if (existingDevice && (option1 || option3)) {
            const configStatus = existingDevice.configStatus?.deviceIsConfigured
            let customError = '';

            if (option1) {
                customError = configStatus
                    ? `Device is already in database and already configured. 
                    Do you want to configure it again and update the device info ?`

                    : `Device is already in database but not configured. 
                    Do you want to configure it and add device info to database ?`;
            }

            else { //option 3 is add device to db only, so if already exist, ask user if he wants to update the device data
                customError = `Device is already in database. Do you want to update the device info ?`;
            }

            return {
                __typename: 'GraphqlError',
                customError,
            };
        }

        //router is being configured again
        if (configAgain && existingDevice) {
            if (option1) {
                return handleConfigAndDBUpdate(deviceInfo, options, generateNewCredentials, true);
            } else if (option2) {
                return handleOnlyConfig(deviceInfo, options, generateNewCredentials);
            } else if (option3) {
                return handleOnlyDBUpdate(deviceInfo, options, generateNewCredentials);
            }
        }

        //router device is probably being configured (for the first time?) again
        else if (!configAgain) {
            if (option1) { //config and then add/update device in db
                return handleConfigAndDBUpdate(deviceInfo, options, generateNewCredentials, false);
            } else if (option2) { //only config device
                return handleOnlyConfig(deviceInfo, options, generateNewCredentials);
            } else { //add device to db only 
                return handleOnlyDBUpdate(deviceInfo, options, generateNewCredentials);
            }
        }

    } catch (err) {
        console.error('Error: ', err);
        return {
            customError: 'An unexpected error occurred',
            __typename: 'GraphqlError',
        };
    }
};
