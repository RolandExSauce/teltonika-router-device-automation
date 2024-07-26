import mongoose, { Document } from 'mongoose'

// maybe more departments here ?
enum Department {
    IT = 'IT',
    OTHERS = 'OTHERS',
}

//enum containing all device modells
enum DeviceModell {
    RUT200 = 'RUT200',
    RUT230 = 'RUT230',
    RUT240 = 'RUT240',
    RUT260 = 'RUT260',
    RUT300 = 'RUT300',
    RUT360 = 'RUT360',
    RUT901 = 'RUT901',
    RUT906 = 'RUT906',
    RUT950 = 'RUT950',
    RUT951 = 'RUT951',
    RUT955 = 'RUT955',
    RUT956 = 'RUT956',
}

// will show us the current technical
//intels on the device after config was done
interface IDeviceConfigStatus {
    lastUsedFirmwareFile?: string;
    lastUsedSDKFile?: string;
    deviceIsConfigured?: boolean;
    importedFromCSV?: boolean;
    lastUpdatedAt?: Date | string;
}


//optional fields, but if actually set, then the fields must be provided
interface IDeviceFieldsOptional {
    shellUser?: string
    passForShellUser?: string
    serialNumber?: string;
    SIMID?: string;
    IMEI?: string;
    LAN_MAC?: string;
}


//device will extend Document as well
interface IDevice extends Document {
    //data we get from qr code or manuelly typed by user
    modell: DeviceModell
    wifiSSID: string
    webUser: string
    passForWebUser: string
    passWifi: string
    //those two are optional
    deviceFieldsOptional?: IDeviceFieldsOptional
    configStatus?: IDeviceConfigStatus //optional cuz user may not always want to configure a device so no need to set this
}


//router device model
type IDeviceModel = mongoose.Model<
    IDevice,
    {},
    {},
    {},
    mongoose.Document<unknown, {}, IDevice> &
    IDevice &
    Required<{ _id: mongoose.Types.ObjectId }>
>
/*********************************************************************************************** */

//add other methods for user if necessary 
interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>
}

// enums
enum Role {
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

interface IUser extends Document {
    username: string
    password: string
    role: Role
    userDep: Department
    verified: boolean //for first login, change password is required
    isValidPassword(password: string): Promise<boolean>;  // Include the method here
}


//infered types from mongoose from user model
type IUserModel = mongoose.Model<
    IUser,
    {},
    {},
    {},
    mongoose.Document<unknown, {}, IUser> &
    IUser &
    Required<{ _id: mongoose.Types.ObjectId }>
>

export {
    Role,
    IUser,
    IDevice,
    Department,
    IUserModel,
    IUserMethods,
    DeviceModell,
    IDeviceModel,
    IDeviceConfigStatus,
    IDeviceFieldsOptional
}
