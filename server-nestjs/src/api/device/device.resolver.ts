import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DeviceService } from './device.service';
import { DeviceConfigInput, UpdateDeviceInput } from './dto/device.type-defs';
import { NO_DEVICES_FOUND } from '../graphql.custom.errors';
import { ConfigDeviceResult, GetDevicesResponse } from './dto/unions';
import {
  ConfigDeviceResponse,
  ConfigOptions,
  FetchDevicesResponse,
} from '../types';
//resolvers related to router devices
@Resolver('Device')
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}
  @Mutation(() => ConfigDeviceResult, { name: 'configAndMaybeAddDeviceInDB' })
  async configAndMaybeAddDeviceInDB(
    @Args('deviceConfigInput') deviceConfigInput: DeviceConfigInput,
  ): Promise<ConfigDeviceResponse> {
    console.log('hit');

    const { deviceInfo, generateNewCredentials, kindOfConfig } =
      deviceConfigInput;
    console.log(deviceInfo);
    console.log(generateNewCredentials);

    switch (kindOfConfig) {
      case ConfigOptions.Option1:
        console.log('option1 chosen');
        break;

      case ConfigOptions.Option2:
        console.log('option2 chosen');
        break;

      case ConfigOptions.Option3:
        console.log('option3 chosen');
        break;

      default:
        console.log('invalid choice');
    }
    // this.deviceService.create(createDeviceInput);
    return {
      statusAfterConfig: {
        deviceIsInDB: true,
        importedFromCSV: true,
        lastTimeDataModified: '',
        lastTimeFirmwareUpgraded: '',
        lastTimeSDKRestored: '',
        lastUpgradedFirmwareVersionFile: '',
        lastUploadedSDKFile: '',
      },
    };
  }

  @Mutation(() => String, { name: 'updateDeviceData' })
  updateDeviceData(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    console.log(updateDeviceInput);
    return 'test';
    // return this.deviceService.update(updateDeviceInput.id, updateDeviceInput);
  }

  @Mutation(() => String, { name: 'deleteOneOrManyDevices' })
  deleteOneOrManyDevices(
    @Args('oneOrMoreSSIDToDelete', { type: () => [String] })
    oneOrMoreSSIDToDelete: string[],
  ) {
    console.log(oneOrMoreSSIDToDelete);
    // return this.deviceService.remove(id);
    return 'test';
  }

  @Query(() => GetDevicesResponse, { name: 'getDevices', description: '' })
  async getDevices(): Promise<FetchDevicesResponse> {
    const devices = await this.deviceService.devices();
    return devices.length !== 0
      ? { devices: devices as any }
      : { customError: NO_DEVICES_FOUND };
  }

  @Query(() => String, { name: 'backupDATA' })
  backupDATA() {
    return 'backup';
    // return this.deviceService.findAll();
  }

  @Query(() => String, { name: 'searchDeviceSpecific' })
  searchDeviceSpecific(@Args('SSIDToSearch') SSIDToSearch: string) {
    console.log(SSIDToSearch);
    // return this.deviceService.findOne(id);
  }
}
