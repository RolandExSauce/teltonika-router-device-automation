import { DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperRouterModel } from './dto/device.entity';
import { UpdateDeviceInput } from './dto/device.type-defs';

// DeviceRespository class to interact with RouterModel entity
@Injectable()
export class DeviceRespository {
  constructor(
    @InjectRepository(SuperRouterModel)
    private readonly deviceRespository: Repository<SuperRouterModel>,
  ) {}

  // get all devices
  async findDevices(): Promise<SuperRouterModel[] | undefined> {
    console.log('devices');
    const devices = this.deviceRespository.find({});
    console.log('devices: ', devices);
    return devices;
  }

  // Find a  device by ssid
  async findBySSID(ssid: string): Promise<SuperRouterModel | undefined> {
    return this.deviceRespository.findOne({
      where: { wifiSSID: ssid },
    });
  }

  // create a config a new device
  async configAndMaybeAddDeviceInDB(
    deviceData: DeepPartial<SuperRouterModel>,
  ): Promise<DeepPartial<SuperRouterModel>> {
    const newDevice = this.deviceRespository.create(deviceData);
    return this.deviceRespository.save(newDevice);
  }

  // update device data, we will use input type from our type-defs
  async updateDeviceData(
    newDeviceData: UpdateDeviceInput,
  ): Promise<SuperRouterModel | null> {
    const deviceToUpdate = await this.findBySSID(
      newDeviceData.wifiSSIDOfDeviceToUpdate,
    );

    if (deviceToUpdate) {
      // Update only the fields that are provided in newUserData
      //   Object.assign(userToUpdate, {
      //     username: newUserData.newUsername ?? userToUpdate.username,
      //     role: newUserData.newRole ?? userToUpdate.role,
      //     userDep: newUserData.newUserDep ?? userToUpdate.userDep,
      //     password: newUserData.newPassword ?? userToUpdate.password,
      //   });

      //   await userToUpdate.hashPassword(); // Manually call hashPassword method when updating user data
      return this.deviceRespository.save(deviceToUpdate);
    }
    return null;
  }

  //delete user
  //   async deleteUser(username: string): Promise<string | null> {
  //     const deleteRes = await this.deviceRespository.delete({ username });
  //     console.log('deleted user result: ', deleteRes);
  //     return deleteRes.affected === 1 ? username : null; //return the deleted username or undefined
  //   }
}
