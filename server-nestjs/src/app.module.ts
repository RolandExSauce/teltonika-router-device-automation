import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { GraphQLConfigModule } from './graphql.module';
import { DeviceModule } from './api/device/device.module';
import { UserModule } from './api/user/user.module';
import { FileModule } from './file.module';
import { FileController } from './api/REST/file.upload.controller';

@Module({
  imports: [
    DatabaseModule,
    GraphQLConfigModule,
    UserModule,
    DeviceModule,
    FileModule,
  ],
  controllers: [FileController],
})
export class AppModule {}
