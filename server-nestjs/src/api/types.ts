//types used throughout the application
import {
  DevicesSuccess,
  StatusAfterConfig,
} from './device/dto/device.type-defs';
import { GraphqlError, Success } from './graphql.global.type-defs';
import { UserResponse, UsersSuccess } from './user/dto/user.type-defs';

/* USER RELATED TYPES START ********************************************************/

//payload for user when signing jwt
interface IPayload {
  username: string;
  sub: string; //will be the user id
}

//merge our types from global.type-defs
type GraphqlResponse = Success | GraphqlError; //for cruds

type LoginResponse = UserResponse | GraphqlError; //for user login

type FetchUsersResponse = UsersSuccess | GraphqlError; //for fetching multiple users

// user role
enum UserRole {
  ADMIN = 'ADMIN', //can do everything
  HELPER = 'HELPER', //can config/update/delete routers
  VIEWER = 'VIEWER', //can only view data
}

// user department
enum UserDepartment {
  IT = 'IT',
  HR = 'HR',
  OTHERS = 'OTHERS',
}

/* USER RELATED TYPES END *********************************************************/

/* DEVICE RELATED TYPES START ********************************************************/
type FetchDevicesResponse = DevicesSuccess | GraphqlError; //for fetching multiple users

type ConfigDeviceResponse = StatusAfterConfig | GraphqlError;

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
  RUT951 = 'RUT951',
  RUT955 = 'RUT955',
  RUT956 = 'RUT956',
}

//enum for configuration options
enum ConfigOptions {
  Option1 = 'Option1', //Configure and add device to DB
  Option2 = 'Option2', //Only configure device
  Option3 = 'Option3', //Add device to DB only
}

/* DEVICE RELATED TYPES END ********************************************************/
type ArraySSIDNonEmpty = [string, ...string[]]; //with this we make sure that atleast one ssid needs to be provided for deletion

//when device is configured, we can choose between these options:
type EntityAlteredOpForConf = {
  type: 'RESTORE';
  BACKUP?: 'BACKUP';
  FIRMWARE?: 'FIRMWARE';
  CONFIG_ALL?: 'BACKUP AND FIRMWARE';
};

type EntityAlteredOps =
  | 'UPDATE'
  | 'CREATE'
  | 'DELETE'
  | 'NO_UPDATE'
  | EntityAlteredOpForConf;

type EntityType = 'DEVICE' | 'USER';

export {
  UserRole,
  UserDepartment,
  IPayload,
  DeviceModell,
  ConfigOptions,
  GraphqlResponse,
  LoginResponse,
  FetchUsersResponse,
  EntityAlteredOps,
  EntityType,
  ArraySSIDNonEmpty,
  /********************/
  FetchDevicesResponse,
  ConfigDeviceResponse,
};
