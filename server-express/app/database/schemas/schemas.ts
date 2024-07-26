import { compare } from 'bcrypt';
import { Schema, model } from 'mongoose'
import { Department, DeviceModell, IDevice, IUser, IUserMethods, IUserModel, Role } from './schemas.interfaces'
import { transformedDate } from '../../../script/tools/utils'
import { hashPassword } from '../../utils/tools';


//user schema
const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        username: {
            type: String,
            minlength: [5, 'Username is too short'],
            maxlength: [25, 'Username is too long'],
            required: [true, 'Username is required'],
            unique: true
        },
        password: { type: String, required: [true, 'user password required'] },
        verified: { type: Boolean, default: false }, //on first login, root user must change the password so that it does not match the one in .env file
        role: { type: String, enum: Object.values(Role), required: [true, 'Assign a role to the user'] },
        userDep: { type: String, enum: Object.values(Department), required: [true, 'User department was not provided'] },
    },
    {
        timestamps: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'users',
    }
)

//hash user password when creating new user or updating user password
userSchema.pre('save', async function (next) {
    let user = this as IUser;
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    // Hash the password
    user.password = await hashPassword(user.password);
});

//hash user password when updating user password using findOneAndUpdate
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update && typeof update === 'object' && '$set' in update) {
        const setUpdate = update.$set as Record<string, any>;
        if (setUpdate.password) {
            try {
                setUpdate.password = await hashPassword(setUpdate.password);
            } catch (err: any) {
                //console.error('Error hashing password:', err);
                return next(err);
            }
        }
    }
    next();
});


//compare password, e.g. for login
userSchema.method('isValidPassword', async function (password: string): Promise<boolean> {
    return await compare(password, this.password);
});

const UserModel = model<IUser, IUserModel>('UserModel', userSchema) //User Model 
/*********************************************************************************************************** */

//device schema
const deviceSchema = new Schema<IDevice>(
    {
        modell: {
            type: String,
            enum: Object.values(DeviceModell),
            required: [true, 'Provide a Modell for your Device'],
        },
        wifiSSID: { type: String, unique: true, required: [true, 'Provide the WIFI SSID of your device'] }, 
        webUser: { type: String, required: [true, 'Device username is needed'] },
        passForWebUser: { type: String, required: [true, 'Password for Device required'] },
        passWifi: { type: String, required: [true, 'WIFI password required'] },

        //Optional fields
        deviceFieldsOptional: {
            shellUser: { type: String, default: 'root' },
            passForShellUser: { type: String },
            serialNumber: { type: String },
            SIMID: { type: String, unique: true },
            IMEI: { type: String, unique: true },
            LAN_MAC: { type: String, unique: true },
            default: {},
        },

        // Device config status
        configStatus: {
            lastUsedFirmwareFile: { type: String },
            lastUsedSDKFile: { type: String },
            deviceIsConfigured: { type: Boolean },
            importedFromCSV: { type: Boolean },
            lastUpdatedAt: { type: Date, get: transformedDate },
            default: {},
        },
    },
    {
        timestamps: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'devices',
    }
);

//middleware to set shell user password if not provided
deviceSchema.pre('save', function (next) {
    //init as empty object if not set
    if (!this.deviceFieldsOptional) {
        this.deviceFieldsOptional = {};
    }
    if (!this.deviceFieldsOptional.passForShellUser) {
        this.deviceFieldsOptional.passForShellUser = this.passForWebUser;
    }
    next();
});

const DeviceModel = model<IDevice>('DeviceModel', deviceSchema) //Model for router

export { UserModel, DeviceModel }
