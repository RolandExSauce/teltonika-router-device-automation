import { ObjectType, Field, InputType } from '@nestjs/graphql';
import {
  deviceConfStatusDescr,
  deviceConfStatusAfterConf,
  deviceWithBaseInfoDescr,
  deviceWithMoreInfoDescr,
  devicesSuccessDescr,
  deviceInfoDescr,
  deviceConfInputDescr,
  newDeviceConfigStatusInputDescr,
  updateDeviceInputDescr,
} from 'src/api/graphql.fields.descriptions';
import { DeviceModell, ConfigOptions } from 'src/api/types';

// Define Device type **************************************************************
@ObjectType({ description: deviceConfStatusDescr })
export class DeviceConfigStatus {
  @Field()
  lastTimeFirmwareUpgraded: string;

  @Field()
  lastTimeSDKRestored: string;

  @Field()
  lastTimeDataModified: string;

  @Field({ nullable: true })
  lastUpgradedFirmwareVersionFile?: string;

  @Field({ nullable: true })
  lastUploadedSDKFile?: string;

  @Field()
  deviceIsInDB: boolean;

  @Field()
  importedFromCSV: boolean;
}

//after device has been configured
@ObjectType({ description: deviceConfStatusAfterConf })
export class StatusAfterConfig {
  @Field({ nullable: true })
  statusAfterConfig: DeviceConfigStatus;

  @Field({ nullable: true })
  successMsg?: string;
}

@ObjectType({ description: deviceWithBaseInfoDescr })
export class DeviceWithBaseInfo {
  @Field(() => DeviceModell)
  modell: DeviceModell;

  @Field()
  wifiSSID: string;

  @Field()
  webUser: string;

  @Field()
  shellUser: string;

  @Field()
  passForShellUser: string;

  @Field()
  passForWebUser: string;

  @Field()
  passWifi: string;

  @Field(() => DeviceConfigStatus)
  configStatus: DeviceConfigStatus; //embedded types
}

//in graphql file: extend type, will this work ?
@ObjectType({ description: deviceWithMoreInfoDescr })
export class DeviceWithMoreInfo extends DeviceWithBaseInfo {
  @Field({ nullable: true })
  serialNumber?: string;

  @Field({ nullable: true })
  SIMID?: string;

  @Field({ nullable: true })
  IMEI?: string;

  @Field({ nullable: true })
  LAN_MAC?: string;

  @Field({ nullable: true })
  ipAdress?: string;
}

// Define LoginInput type *********************************************************
@ObjectType({ description: devicesSuccessDescr })
export class DevicesSuccess {
  @Field(() => [DeviceWithMoreInfo])
  devices: [DeviceWithMoreInfo];
}

// Define CreateUserInput type ******************************************************
@InputType({ description: deviceInfoDescr })
export class DeviceInfo {
  @Field(() => DeviceModell)
  modell: DeviceModell;

  @Field()
  wifiSSID: string;

  @Field()
  webUser: string;

  @Field()
  shellUser: string;

  @Field()
  passForShellUser: string;

  @Field()
  passForWebUser: string;

  @Field()
  passWifi: string;

  //optional fields:
  @Field({ nullable: true })
  serialNumber?: string;

  @Field({ nullable: true })
  SIMID?: string;

  @Field({ nullable: true })
  IMEI?: string;

  @Field({ nullable: true })
  LAN_MAC?: string;

  @Field({ nullable: true })
  ipAdress?: string;
}

//input type on device config
@InputType({ description: deviceConfInputDescr })
export class DeviceConfigInput {
  @Field()
  generateNewCredentials: boolean;

  @Field(() => ConfigOptions)
  kindOfConfig: ConfigOptions;

  @Field()
  deviceInfo: DeviceInfo;

  //if option 1 and 2 selected, then config files are needed, will be handled by rest post controller
}

@InputType({ description: newDeviceConfigStatusInputDescr })
export class NewDeviceConfigStatusInput {
  @Field()
  NewLastTimeFirmwareUpgraded: string;

  @Field()
  NewLastTimeSDKRestored: string;

  @Field()
  NewLastTimeDataModified: string;

  @Field({ nullable: true })
  NewLastUpgradedFirmwareVersionFile?: string;

  @Field({ nullable: true })
  NewLastUploadedSDKFile?: string;

  @Field()
  NewDeviceIsInDB: boolean;

  @Field()
  NewImportedFromCSV: boolean;
}

// Define UpdateUserInput type *******************************************************
@InputType({ description: updateDeviceInputDescr })
export class UpdateDeviceInput {
  @Field()
  wifiSSIDOfDeviceToUpdate: string; //mandatory

  @Field(() => DeviceModell, { nullable: true })
  newModell?: DeviceModell;

  @Field({ nullable: true })
  newWifiSSID?: string;

  @Field({ nullable: true })
  newWebUser?: string;

  @Field({ nullable: true })
  newShellUser?: string;

  @Field({ nullable: true })
  newPassForWebUser?: string;

  @Field({ nullable: true })
  newPassForShellUser?: string;

  @Field({ nullable: true })
  newPassWifi?: string;

  //use embedded type for device config status details
  @Field(() => NewDeviceConfigStatusInput, { nullable: true })
  newConfigStatus?: NewDeviceConfigStatusInput;
}
