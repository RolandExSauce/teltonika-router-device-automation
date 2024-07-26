import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from './device.service';
import { DeviceResolver } from './device.resolver';
import { DeviceRespository } from './device.repo';
import { SuperRouterModel } from './dto/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperRouterModel]),
    //AuthModule,
  ],
  providers: [DeviceResolver, DeviceService, DeviceRespository],
})
export class DeviceModule {}
