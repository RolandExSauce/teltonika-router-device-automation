import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './api/REST/file.upload.controller';

//module for file uploading
@Module({
  imports: [MulterModule.register()],
  controllers: [FileController],
})
export class FileModule {}
