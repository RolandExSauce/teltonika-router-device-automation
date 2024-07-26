import { Injectable } from '@nestjs/common';
import { DeviceRespository } from './device.repo';
import { SuperRouterModel } from './dto/device.entity';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRespository) {}

  //get all users
  async devices(): Promise<SuperRouterModel[]> {
    return this.deviceRepository.findDevices();
  }

  device(ssid: string) {
    return this.deviceRepository.findBySSID(ssid);
  }

  update(id: number, updateDeviceInput: any) {
    console.log(updateDeviceInput);
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
